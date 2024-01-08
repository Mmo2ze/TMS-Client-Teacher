import {useState} from "react"
import axios from "../config/axiosconfigClient"
const {
    endLodingToast,
    lodingToast,
    sendToast,
  } = require("../func/toast");
  import { ToastContainer, toast } from "react-toastify";
  
  import "react-toastify/dist/ReactToastify.css";

const PopOllStudent = ({studentName , studentId , onCansle, placeholder}) => {
    const [quizValue ,setQuizValue] = useState("")
    const handelSubmit = async () => {
        var toastID = lodingToast();
        try {
          console.log("Attempting to update data...");
          await axios.post(`/api/Teacher/student/quiz`, {
            studentId: studentId,
            degree: parseInt(quizValue, 10), 
        });
        endLodingToast(toastID, "تم اضافة  الدرجة", "success");
          onCansle();
          console.log("Data updated successfully!");
        } catch (error) {
            if (error.response.status === 404) {
                endLodingToast(toastID, " ادخل  ", "error");
              } else if (error.response.status === 400) {
                var message1 = error.response.data.messages[0];
                if (message1) {
                  switch (message1.statusCode) {
                    case 302: {
                      endLodingToast(toastID, 'الرقم   حطأ', "error");
                      break;
                    }
                    case 301: {
                      endLodingToast(toastID, "لقد ادخلت رقم خطأ", "error");
                      break;
                    }
                    default: {
                      endLodingToast(toastID, " المحاولة مرة اخرى", "error");
                      break;
                    }
                  }
                }
              }
        }
      };
      
    return (
        <> 
    <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40">

        <h1 className="mb-5 text-3xl text-bold text-side12-color text-center"> {studentName} </h1> 
        <input onChange={(e)=> setQuizValue(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-end" placeholder={placeholder} required />
        <div className="flex justify-between items-center mt-6"> 


        <button onClick={onCansle} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                الغاء
            </button>
        <button onClick={handelSubmit} type="button" className="rounded-lg focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5 me-2 mb-2 dark:bg-button-color2">
        ارسال
        </button>
 
        </div>

        </div> 
        </>
    )
}
export default PopOllStudent