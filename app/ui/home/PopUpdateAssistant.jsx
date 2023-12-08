import {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import InputAddClass from '../addClass/InputAddClass';
import ButtonAdd from '../ButtonAdd';
import axios from "../../config/axiosconfigClient"

const PopUpdateAssistant = ({names , phones , id  , rol, onCansle , restartData}) => {
  const [name , setName] = useState(names) 
  const [phone , setPhone] = useState(phones) 
  const [rolse , setRolse] = useState(rol) 

  const handleSubmitAssis = (event) => {
    setRolse(event.target.value);};
    const handelSubmit = async () => {
      try {
        console.log("Attempting to update data...");
        await axios.put(`/api/Teacher/assistant/${id}`, {
          name: name,
          phone:phone,
          assistantRoles : [rolse]
        });
        
        onCansle();
        restartData()
        console.log("Data updated successfully!");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
  

  return (
          <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40">
      <button > <CloseIcon sx={{ fontSize: 50 }} onClick={onCansle} color="primary"/></button>
      <h1 className="text-3xl absolute top-6 right-4 text-color-text">اضافة مساعد</h1>
     <div className="mt-4"> 
     <select
     value={rolse}
     onChange={handleSubmitAssis} 

          id="countries"
          className="text-end bg-red-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>
            اختيار الصفة
          </option>
          <option value="AddUser" >  AddUser</option>
          <option value="AddClass">AddClass </option>
          <option value="AddPayment">AddPayment  </option>
          <option value="ViewPayment ">ViewPayment   </option>
        </select>
     </div>
      <InputAddClass type="text" value={name}  onChange={setName} lable="اسم المساعد"/>
      <InputAddClass type="number" value={phone}  onChange={setPhone} lable="رقم المساعد"/>

      <div className="mx-auto my-4 tetx-center w-[19%]"> 
  <ButtonAdd onClick={handelSubmit}  text="اضافة"/>
    </div>
 </div>
  )
}

export default PopUpdateAssistant