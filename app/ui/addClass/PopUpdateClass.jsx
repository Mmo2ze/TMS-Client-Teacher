import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {useState } from "react"
import InputAddClass from './InputAddClass';
import axios from "../../config/axiosconfigClient"

const PopUpdateClass = ({onCansle , initialName, initialPaymentPrice, initialPaymentDelay, initialGrade , initialId , }) => {
  const [name, setName] = useState(initialName);
  const [paymentPrice, setPaymentPrice] = useState(initialPaymentPrice);
  const [paymentDelay, setPaymentDelay] = useState(initialPaymentDelay);
  const [selectedGrade, setSelectedGrade] = useState(initialGrade); 



  const handelUpdate = async () => {
    try {
      console.log("Attempting to update data...");
      await axios.put(`/api/Teacher/class/${initialId}`, {
        name: name,
        basePaymentPrice: paymentPrice,
        basePaymentDelay: paymentDelay,
        grade: selectedGrade,
      });
      onCansle();
      console.log("Data updated successfully!");
      const updatedData = data.map(item => {
        if (item.id === initialId) {
          return {
            ...item,
            name: name,
            basePaymentPrice: paymentPrice,
            basePaymentDelay: paymentDelay,
            grade: selectedGrade,
          };
        }
        return item;
      });
      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="fixed z-50 p-4 bg-side4-color md:mt-7 rounded-lg w-[96%]  md:w-1/2 mt-2 top-[55%] md:top-1/2 left-1/2 center text-end">
        {/* <div className=" absolute w-[90%] md:w-1/2 p-4 rounded-lg top-[80%] md:top-1/2 left-1/2 center bg-side4-color z-40"> */}
        <h1 className=" absolute top-[-40px] md:top-[-50px] left-[20%] text-button-color2-hover text-3xl"> تحديث معلومات الصف</h1>
    <div className="absolute top-0 left-2 cursor-pointer">
        <CloseIcon sx={{ fontSize: 50 }}  onClick={onCansle}  color="primary"/>
       </div>
       <div className="text-end">
        <label htmlFor="countries" className="text end block mb-3 text-lg font-medium text-gray-900 dark:text-white">
          الرجاء اختيار الصف
        </label>
        <select
          id="countries"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
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
       <button onClick={handelUpdate} type="button" className="focus:outline-none w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-button-color2 ">
       تحديث
        </button>
    {/* </div> */}

    </div>
  )
}

export default PopUpdateClass


