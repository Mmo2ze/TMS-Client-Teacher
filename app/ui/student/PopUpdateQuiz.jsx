import CloseIcon from '@mui/icons-material/Close';
import InputAddClass from '../addClass/InputAddClass';
import {useEffect, useState} from 'react'
import {sendToast,loadingToast,endLodingToast} from "../../func/toast";

const PopUpdateQuiz = ({ onCansle, update, axios, quizId, degree: initialDegree, rate: initialRate }) => {
    const [score, setScore] = useState(initialDegree);
  const [newDegree, setNewDegree] = useState(initialRate);


    function UpdateQuiz() {
        axios.put(`api/v1/Teacher/quiz/${quizId}`, {
            degree: score,
            rate: newDegree
        }).then((res) => {
            onCansle();
            update();
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40 direction_rtl">
 <div className="absolute top-0 left-2 cursor-pointer">
        <CloseIcon sx={{ fontSize: 50 }} onClick={onCansle} color="primary"/>
       </div>       
       <InputAddClass onChange={setNewDegree} value={newDegree} lable="ادخل الدرجة العظمى الجديدة" type="number"/>
       <InputAddClass onChange={setScore} value={score}  lable="ادخل الدرجة الجديدة" type="number"/>
       <div className="flex justify-between px-4 mt-4">
       <button onClick={UpdateQuiz} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                تأكيد
                
            </button>
            <button  onClick={onCansle} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                الغاء
            </button>
        </div>
 
       
       
        </div>
    )
}
export default PopUpdateQuiz