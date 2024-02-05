import CloseIcon from '@mui/icons-material/Close';
import InputAddClass from '../addClass/InputAddClass';
import {useEffect, useState} from 'react'
import {sendToast,loadingToast,endLodingToast} from "../../func/toast";

const PopUpdateAttendes = ({onCansle , update , axios  , id}) => {
    const [status , setStatus] = useState("")
    console.log(`the status is : ${status}`)
    const handelUpdate = async () => {
        var toastID = loadingToast();

        try {
          await axios.put(`/api/v1/Teacher/attendance/${id}`, {
            name: name,
            basePaymentPrice: paymentPrice,
            basePaymentDelay: paymentDelay,
            grade: selectedGrade,
          });
          endLodingToast(toastID, "تم التعديل بنجاح", "success");
    
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
            endLodingToast(toastID, "error", "error");

        }
      };

    return(
        <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40 direction_rtl">
 <div className="absolute top-0 left-2 cursor-pointer">
        <CloseIcon sx={{ fontSize: 50 }} onClick={onCansle} color="primary"/>
       </div>       
       {/* <InputAddClass onChange={setNewDegree} value={newDegree} lable="ادخل الدرجة العظمى الجديدة" type="number"/>
       <InputAddClass onChange={setScore} value={score}  lable="ادخل الدرجة الجديدة" type="number"/> */}
        <div className="mt-12">
        <select value={status} onChange={(e) => setStatus(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>اختر الحالة </option>
          <option value="Attend">حضور</option>
          <option value="Absent">غياب</option>
          <option value="Late">تأخير</option>
          <option value="Excuse">عذر</option>
          <option value="Holiday">عطلة</option>
        </select>
      </div>
      
       <div className="flex justify-between px-4 mt-4">
       <button  onClick={handelUpdate}  type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                تأكيد
            </button>
            <button  onClick={onCansle} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                الغاء
            </button>
        </div>
 
       
       
        </div>
    )
}
export default PopUpdateAttendes