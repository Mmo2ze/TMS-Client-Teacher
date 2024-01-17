"use client"
import { useState  , useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import StudentBox from "@/app/ui/student/StudentBox"
import Spinners from '@/app/ui/Spinners';
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../config/axiosconfigClient"

const page = (props) => {
    const [data , setData] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getdata = async () => {
          try {
            const response = await axios.get(`/api/Teacher/class/${props.params.id}?requiredStudents=true&requiredSections=false`);
            setData(response.data);
            setIsLoading(false);

          } catch (e) {
            console.log(e);
          }
        };
  

      }, []);
    
    return (
        <div className="pt-20 px-4">
        <ToastContainer/>
      <div className="p-4"> 
      <div className="flex  align-center justify-between text-color-text">
      <div className="cursor-pointer"> <AccessTimeIcon sx={{ fontSize: 60 }}/></div>
      <div className="cursor-pointer" > <AddIcon sx={{ fontSize: 60 }}/></div>
      </div>
 
      {isLoading && <Spinners/>}
      <div> 
{!isLoading && data.map((da) => (
<StudentBox name={da.name} id={da.id}/>
))}
</div> 


      </div> 
      </div>
    )
}
export default page
    // <input
    //           type="search"
    //           id="default-search"
    //           autoComplete="off"
    //           className="block text-end w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           placeholder="البحث عن طالب"
    //           required
    //         />