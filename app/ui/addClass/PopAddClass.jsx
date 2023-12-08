"use client"
import CloseIcon from '@mui/icons-material/Close';
import InputAddClass from './InputAddClass';
import {useState } from "react"
import axios from "../../config/axiosconfigClient"
import ButtonAdd from '../ButtonAdd';
const PopAddClass = ({onCansle , onGet}) => {
  const [name, setName] = useState("");
  const [paymentPrice, setPaymentPrice] = useState("");
  const [paymentDelay, setPaymentDelay] = useState("");
  const [grade, setGrade] = useState("");
  const handleGradeChange = (event) => {
    setGrade(event.target.value);};
    const handelSubmit = async () => {
      try {
        console.log("Attempting to update data...");
        await axios.post(`/api/Teacher/class`, {
          name: name,
          basePaymentPrice: paymentPrice,
          basePaymentDelay: paymentDelay,
          grade: grade,
        });
        onCansle();
        onGet();
        console.log("Data updated successfully!");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
    
  return (
    <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40">
  
    <div className="absolute top-0 left-2 cursor-pointer">
        <CloseIcon sx={{ fontSize: 50 }} onClick={onCansle} color="primary"/>
       </div>
       <div className="text-end">
        <label htmlFor="countries" className="text end block mb-3 text-lg font-medium text-gray-900 dark:text-white">
          الرجاء اختيار الصف
        </label>
        <select
          id="countries"
          onChange={handleGradeChange} 
          className="text-end bg-red-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>
            اختيار الصف
          </option>
          <option value="FirstSecondary" > اولى ثانوي</option>
          <option value="SecondSecondary">ثاني ثانوي</option>
          <option value="ThirdSecondary">ثالث ثانوي </option>
        </select>
      </div>
       <InputAddClass type="text" value={name} onChange={setName} lable="ادخل الاسم"/>
       <InputAddClass type="number" value={paymentPrice} onChange={setPaymentPrice} lable="ادخل السعر"/>
       <InputAddClass type="number" value={paymentDelay} onChange={setPaymentDelay} lable="ادخل مدة التاخير"/>
<div className="w-full mt-4 "> 
<div className="mx-auto my-4 tetx-center w-[19%]"> 

        <ButtonAdd onClick={handelSubmit} text="اضافة"/>
</div>

</div>
    </div>
  )
}
export default PopAddClass