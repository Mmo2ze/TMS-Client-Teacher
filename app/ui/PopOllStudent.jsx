import {useState} from "react"
import { endLodingToast, loadingToast, sendToast, }  from "../func/toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAddClass from "./addClass/InputAddClass";
import {useEffect} from "react"
const PopOllStudent = ({studentName , studentId , onCansle, placeholder , score ,setScore, onRef,axios}) => {
    const [quizValue ,setQuizValue] = useState("")
    const [data, setData] = useState([]);
    const handelSubmit = async () => {
        let toastID = loadingToast();
        try {
          console.log("Attempting to update data...");
          await axios.post(`/api/v1/Teacher/quiz`, {
            studentId: studentId,
            degree: parseInt(quizValue, 10), 
            maxDegree: parseInt(score, 10),
        });
        endLodingToast(toastID, "تم اضافة  الدرجة", "success");
          onCansle();
          setScore(score);          
          onRef()
          console.log("Data updated successfully!");
        } catch (error) {
              if (error.response.status === 400) {
                let message1 = error.response.data.messages[0];
                if (message1) {
                  switch (message1.statusCode) {
                    case 301: {
                      endLodingToast(toastID, ' تم اضافة درجة لهذا الطالب بالفعل', "warning");
                      break;
                    }
                    case 302: {
                      endLodingToast(toastID, "الدرجة المدخلة خاطئة", "error");
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
      
console.log(`tha score  is ${score}`)



    return (
        <> 
    <div className=" fixed  w-[90%]  md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40">

        <h1 className="mb-5 text-3xl text-bold text-side12-color text-center"> {studentName} </h1> 
        <div className="flex gap-3 items-center justify-center">
        <input onChange={(e)=> setQuizValue(e.target.value)} type="number"  className=" mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-end" placeholder={placeholder} required />
        <h1 className="text-4xl mt-4 ">/</h1>
        {/* <input  type="number"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-end" value={`${defaultScore}`} required /> */}
        <InputAddClass  value={score}  type="number" onChange={setScore}/>
        </div>
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