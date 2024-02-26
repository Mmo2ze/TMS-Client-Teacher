"use client"
import {useEffect, useState} from 'react'
import InputAddClass from '../../../ui/addClass/InputAddClass';
import Spinners from '../../../ui/Spinners'
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {sendToast,loadingToast,endLodingToast} from "../../../func/toast";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopUpdateAttendes from './../../../ui/student/PopUpdateAttendes';
import CloseIcon from '@mui/icons-material/Close';

const page = (props) => {
    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [data , setDate] = useState("")
    const [ShowUpdatePopup, setShowUpdatePopup] = useState ( false );
    const [theId , setTheId] = useState("")

    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        const fetchData = async () => {
            try {
                var response = await axios.get ( `/api/v1/Teacher/attendance?StudentId=${props.params.id}&PageSize=100&Page=1`);
                setDate(response.data)
            } catch (error) {
                if(error.response.status != 404)
                sendToast("حدث خطأ ما اثناء سحب البيانات","error");
            }
        }
        fetchData ();
    }, [Roles] );
    const handeleUpdate = (id) => {
      setTheId(id)
      setShowUpdatePopup(true)
    }

    // function DeleteAttend (attend) {
    //     let id = attend.id;
    //     return async () => {
    //         try {
    //             let response = await axios.delete ( `/api/v1/Teacher/attendance/${id}` );
    //             sendToast("تم حذف الحضور بنجاح","success");
    //             setDate(data.filter((da) => da.id !== id))
    //         } catch (error) {
    //             sendToast("حدث خطأ ما اثناء حذف الحضور","error");
    //         }
    //     }
    // }
    const getStatusLabel = (status) => {
      switch (status) {
        case 'Attend':
          return <span className="text-green-400">حضور</span>;
        case 'Absent':
          return <span className="text-red-400">غياب</span>;
        case 'Late':
          return <span className="text-yellow-400">تأخير</span>;
        case 'Excuse':
          return <span className="text-purple-400">عذر</span>;
        case 'Holiday':
          return <span className="text-blue-400">عطلة</span>;
        default:
          return status;
      }
    };
    
    return (
    <div className="pt-20 px-4 relative">
                        {ShowUpdatePopup && ( <div className="overlay"> <PopUpdateAttendes axios={axios} id={theId}
                                                                                           data = {data} setData= {setDate} onCansle={() =>  setShowUpdatePopup(!ShowUpdatePopup)}/> </div>)}
<ToastContainer />
   <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                الحالة 
              </th>
              <th scope="col" className="px-6 py-3">
                اليوم
              </th>
              <th scope="col" className="px-6 py-3">
                مدة التأخير
              </th>
              <th scope="col" className="px-6 py-3">
                تعديل
              </th>
       
            </tr>
          </thead>
          <tbody>
            {data && data.map((da) => (

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white">
         <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:${da.status === 'Attend' ? 'text-green-400' : da.status === 'Absent' ? 'text-red-500' : 'text-white'}`}>
  {getStatusLabel(da.status)}
</th>
              <td className="px-6 py-4">
              {da.date}
              </td>
              <td className="px-6 py-4">
              {da.lateMinutes === 0 ? <h1 className="text-5xl">-</h1> : da.lateMinutes}
              </td>
              <td className="px-6 py-4 text-color-aqua cursor-pointer">
                <EditIcon onClick={() => handeleUpdate ( da.id )}/>
              </td>
         
            </tr>
        
           
              ))}
          </tbody>
        </table>
      </div>
    
    </div>
  )
}

export default page