"use client"
import CloseIcon from '@mui/icons-material/Close';
import InputAddClass from './InputAddClass';
import {useState } from "react"
import ButtonAdd from '../ButtonAdd';
const {
  endLodingToast,
  loadingToast,
  sendToast,
} = require("../../func/toast");
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PopAddClass = ({onCansle , onGet,axios}) => {
  const [name, setName] = useState("");
  const [paymentPrice, setPaymentPrice] = useState("");
  const [paymentDelay, setPaymentDelay] = useState("");
  const [grade, setGrade] = useState("");
  const handleGradeChange = (event) => {
    setGrade(event.target.value);};
    const handelSubmit = async () => {
      var toastID = loadingToast();

      try {
        if (!name || !paymentPrice || !paymentDelay || !grade) {
          console.error("يرجى تعبئة جميع الحقول");
          endLodingToast(toastID, "يرجى تعبئة جميع الحقول", "error");

          return;
        }
        console.log("Attempting to update data...");
        await axios.post(`/api/v1/Teacher/class`, {
          name: name,
          basePaymentPrice: paymentPrice,
          basePaymentDelay: paymentDelay,
          grade: grade,
        });
        endLodingToast(toastID, " تم اضافة الحصة  بنجاح", "success");
        onCansle();
        onGet();

        console.log("Data updated successfully!");
      } catch (error) {
        var message1;

        if (error.response && error.response.data && error.response.data.messages) {
          message1 = error.response.data.messages[0];
        }
        if (message1) {
          switch (message1.statusCode) {
            case 302: {
              endLodingToast(toastID, "!", "error");
              break;
            }
            case 201: {
              endLodingToast(toastID, "يرجى تغيير الاسم الاسم مستخدم بالفعل", "error");
              break;
            }
          }
        } 
      }
    };
    
  return (
    <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40 direction_rtl">
    <div className="absolute top-0 left-2 cursor-pointer">
        <CloseIcon sx={{ fontSize: 50 }} onClick={onCansle} color="primary"/>
       </div>
       <div >
        <label htmlFor="countries" className=" block mb-3 text-lg font-medium text-gray-900 dark:text-white">
          الرجاء اختيار الصف
        </label>
        <select
          id="countries"
          onChange={handleGradeChange} 
          className=" bg-red-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>
            اختيار الصف
          </option>
          <option value="FirstSecondary" > اولى ثانوي</option>
          <option value="SecondSecondary">ثاني ثانوي</option>
          <option value="ThirdSecondary">ثالث ثانوي </option>
        </select>
      </div>
       <InputAddClass type="text" value={name} onChange={setName} lable="ادخل اسم الصف"/>
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