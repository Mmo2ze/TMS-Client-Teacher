"use client"
import { useState  , useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import StudentBox from "../../../ui/student/StudentBox"
import Spinners from "../../../ui/Spinners"
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
import HomeIcon from '@mui/icons-material/Home';
import {Paid} from "@mui/icons-material";
const page = (props) => {

    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [data , setData] = useState([])
    const [search , setSearch] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [searchWord, setSearchWord] = useState('');
    const limit = 50;
    const [notFound, setNotFound] = useState(false);
    const PaymentStatus = Object.freeze( {
        Paid : 0,
        Unpaid : 1,
        All : 2,
    });
    const    AttendanceStatus  = Object.freeze({
        Non:0 ,
        True :1 ,
        False: 2,
    });
    const [attendanceFilter, setAttendanceFilter] = useState(AttendanceStatus.Non)
    const [PaymentFilter, setPaymentFilter] = useState(PaymentStatus.All);


    const [page, setPage] = useState(1);
    const handleSelectChange = (e) => {
        switch (e.target.value) {
            case "1":
                setPaymentFilter(PaymentStatus.Paid);
            break
            case "2":
                setPaymentFilter(PaymentStatus.Unpaid);
            break;
            case "3":
                setAttendanceFilter(AttendanceStatus.True);
                break
            case "4":
                setAttendanceFilter(AttendanceStatus.False);
                break
            default:
                setPaymentFilter(PaymentStatus.All);
                setAttendanceFilter(AttendanceStatus.Non)

        }

    };
    
      useEffect(() => {
        const delaySearch = setTimeout(() => {
          const fetchData = async () => {
              if (HaveRole ( [null] )) return;

              try {

              const url = `/api/v1/Teacher/student?searchWord=${searchWord}&limit=${limit}&page=${page}&classId=${props.params.id}&PaymentStatus=${PaymentFilter}&attend=${attendanceFilter}`;
              const response = await axios.get(url);
              setData(response.data);
              console.log(response.data)
              setIsLoading(false);
              setNotFound(false)
            } catch (error) {
              if(error.response.status == 404){
                console.log("not found")
                setNotFound(true)
              }
              console.error(error);
            }
          };
    
          fetchData();
        }, 500);
    
        return () => clearTimeout(delaySearch);
      }, [searchWord,Roles,PaymentFilter,page,limit,attendanceFilter]);

    if (HaveRole ( [null] )) return <Spinners/>;
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
    return (
        <div className="pt-20 px-2">
        <ToastContainer/>
      <div className="p-4"> 
      <div className="flex  align-center justify-between text-color-text">
      <div className="cursor-pointer"> <Link href={`/classes/section/${props.params.id}`}>  <AccessTimeIcon sx={{ fontSize: 60 }}/></Link></div>
      <div className="cursor-pointer" > <Link href={`/classes`}> <HomeIcon sx={{ fontSize: 60 }}/> </Link></div>
      </div>
      <div className="mt-6 w-[95%] 2sm:w-[90%] mx-auto direction_rtl">
        {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">فلترة الطلاب</label> */}
        <select   onChange={(e) => handleSelectChange(e)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="0">الجميع</option>
        <option value="1">مدفوع</option>
        <option value="2">غير مدفوع</option>
        <option value="3">الحضور</option>
        <option value="4">الغياب</option>
        </select>
      </div>

      <div className="mt-6 w-[95%] 2sm:w-[90%] mx-auto"> 
        <input
              type="search"
              id="default-search"
              autoComplete="off"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="block text-end w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="البحث عن طالب"
              required
            />
        </div>
 
      {isLoading && <Spinners/>}
          {notFound && <div className="text-center mt-10 text-2xl text-color-text"> لا يوجد نتائج </div>}
      <div> 
{(!isLoading &&!notFound)&& data.map((da) => (
  <Link href={`/student/${da.privateId}`}> 
<StudentBox className={da.className} grade={da.grade} name={da.student.name} id={da.privateId}gender={da.student.gender}isPayed={da.isPayed}/>
 </Link>
))}
</div> 


      </div> 
      </div>
    )
} else {
        router.push ( "/login" );
    }
}
export default page
