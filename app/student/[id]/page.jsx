"use client"
import {useState , useEffect} from 'react'
import img1 from "../../../public/mother.png";
import Image from "next/image";
import Button from "../../ui/Button";
import Spinners from '../../ui/Spinners';
import InputStudent from "../../ui/InputStudent";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import axios from "../../config/axiosconfigClient"

const page = (props) => {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentId,setStudentId] = useState("")
  const [studentName,setStudentName] = useState("")
  const [studentGrade,setStudentGrade] = useState("")
  const [studentClass,setStudentClass] = useState("")
  const [studentPhone,setStudentPhone] = useState("")
  const [studentGender,setStudentGender] = useState("")
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(`/api/Teacher/student/${props.params.id}`);
        setData(response.data.data);
        setIsLoading(false);
        // console.log(`sadasdas${response.data.data.privateId}`)
        setStudentName(response.data.student.name)
        setStudentClass(response.data.className)
        setStudentGrade(response.data.grade)
        setStudentPhone(response.data.student.phone)
        setStudentGender(response.data.student.gender)
        setStudentId(response.data.privateId);
      } catch (e) {
        console.log(e);
      }
    };
  
    getdata(); 
  }, []);
  console.log(`sadasdas${studentId}`)

  return (
    <div className="pt-20 px-3">
      <div className="img_liner p-4 rounded-lg flex flex-col gap-5">
        <div className="flex justify-between items-center mb-1">
          <Image
            src={img1}
            width={65}
            height={65}
            alt="Picture of the author"
          />
          <div>
            <h1 className="text-xl mb-2 text-side12-color md:text-3xl">
              {studentName} 
            </h1>
            <p className="text-end text-side13-color md:text-xl">
              {studentClass}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          {/* <Link to={`https://wa.me/+2${def.parentPhone}`}> */}
          <Link href={`https://wa.me/+201004714938`}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <WhatsAppIcon />
            </button>
          </Link>

          <button
            className={
              true
                ? "paym-details_student bg-green-100 text-green-800 text-lg font-medium mr-2 w-[80px]  h-[45px] p-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                : "paym-details_student bg-red-100 text-red-800 text-lg font-medium mr-2 w-[90px]  h-[45px] p-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
            }
          >
            {true ? "مدفوع" : "غير مدفوع"}
          </button>

          {/* <Link to={`tel:${def.parentPhone}`}> */}
          <Link href={`tel:201004714938`}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <PhoneIcon />
            </button>
          </Link>
        </div>

        <div className="flex justify-center">
        <Link href={`/student/${props.params.id}/payment`}>

          <button
            type="button"
            className="text-white  flex bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium w-fit  rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 m-auto"
          >
            المصاريف 
          </button>
          </Link>

        </div>
      </div>

      <div className="img_liner_2 mt-4 p-2 rounded-lg"> 

      <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col">
      <InputStudent lable="الاسم" placeholder={studentName}/>
      <InputStudent lable="ID" placeholder={studentId}/>
      

      </div>

      <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col">
      <InputStudent lable="الشعبة" placeholder={studentClass}/>
      <InputStudent lable="الصف" placeholder={studentGrade}/>
      </div>


      <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col">
      <InputStudent lable="رقم ولي الامر" placeholder={studentPhone}/>
      <InputStudent lable="الرقم" placeholder={studentPhone}/>
      </div>

      <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col">
      <InputStudent lable="السعر" placeholder="200$"/>
      <InputStudent lable="مدة التأخير" placeholder="7"/>

      </div>


      {/* <div className="flex justify-center items-center gap-10">
  <div className="flex flex-col items-center">
    <label htmlFor="default-radio-1" className="mb-2 ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">
      طالب
    </label>
    <input
      id="default-radio-1"
      type="radio"
      defaultValue
      name="default-radio"
      className="w-10 h-8 rounded-lg text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      defaultChecked={studentGender.toLowerCase() === 'male'}
      />
  </div>
  <div className="flex flex-col items-center">
    <label htmlFor="default-radio-2" className="mb-2 ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">
      طالبة
    </label>
    <input
      id="default-radio-2"
      type="radio"
      defaultValue
      name="default-radio"
      className="w-10 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      defaultChecked={studentGender.toLowerCase() === 'female'}
      />
  </div>
</div> */}


      </div>
    </div>
  );
};

export default page;
