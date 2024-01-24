import {useState , useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import InputAddClass from '../addClass/InputAddClass';
import ButtonAdd from '../ButtonAdd';

const PopUpdateAssistant = ({names , phones , id  , rol,axios, onCansle , restartData  , rolesValues}) => {
  console.log("the rolesValues are box are",(rolesValues));
  const [name , setName] = useState(names) 
  const [phone , setPhone] = useState(phones) 
  const [rolse , setRolse] = useState(rol)
  const [isDropdownOpenStudent, setIsDropdownOpenStudent] = useState(false);
  const [rolseAssistant, setRolseAssistant] = useState([
      { name: "AddUser", isSelected: false },
      { name: "AddClass", isSelected: false },
      { name: "AddPayment", isSelected: false },
      { name: "ViewPayment", isSelected: false },
      { name: "RecordAttendance", isSelected: false },
      { name: "RecordCards", isSelected: false },
      { name: "RecordQuiz", isSelected: false },
  ]);
  const handleSubmitAssis = (event) => {
    setRolse(event.target.value);};
    const handelSubmit = async () => {
      try {
        console.log("Attempting to update data...");
        const selectedRoles = rolseAssistant
          .filter((rol) => rol.isSelected)
          .map((selectedRol) => selectedRol.name);
    
        await axios.put(`/api/Teacher/assistant/${id}`, {
          name: name,
          phone: phone,
          assistantRoles: selectedRoles,
        });
    
        onCansle();
        restartData();
        console.log("Data updated successfully!");
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
    const handleDropdownOpenStudent = () => {
      setIsDropdownOpenStudent(!isDropdownOpenStudent);
    };
    const handleCheckboxChange = (name) => {
      const updatedRolse = rolseAssistant.map((rol) =>
        rol.name === name ? { ...rol, isSelected: !rol.isSelected } : rol
      );
      setRolseAssistant(updatedRolse);
    };

    useEffect(() => {
      const updatedRolse = rolseAssistant.map((rol) => ({
        ...rol,
        isSelected: rolesValues.includes(rol.name)
      }));
      setRolseAssistant(updatedRolse);
    }, [rolesValues]);

  return (
          <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40">
      <button > <CloseIcon sx={{ fontSize: 50 }} onClick={onCansle} color="primary"/></button>
      <h1 className="text-3xl absolute top-6 right-4 text-color-text">اضافة مساعد</h1>
     <div className="mt-4"> 
     {/* <select
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
        </select> */}
           <div className="text-end"> 
      <button
              id="dropdownBgHoverButton"
              data-dropdown-toggle="dropdownBgHover"
              className="text-white w-full bg-gray-700 text-end justify-end  font-medium rounded-lg text-sm px-5 py-2.5  inline-flex items-center dark:bg-gray-700"
              type="button"
              onClick={handleDropdownOpenStudent}
            >
 اختيار صفة
<svg
className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
  isDropdownOpenStudent ? "rotate-180" : ""
}`}
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 10 6"
>
<path
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="m1 1 4 4 4-4"
/>
</svg>
</button>
  <div
id="dropdownBgHover"
className={`z-10 ${
  isDropdownOpenStudent ? "block" : "hidden"
} w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute right-4 mt-2 `}
>          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">

{rolseAssistant.map((rol) => (
  <li key={rol.name}>
    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
      <input
        id={`checkbox-item-${rol.name}`}
        type="checkbox"
        checked={rol.isSelected}
        onChange={() => handleCheckboxChange(rol.name)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        htmlFor={`checkbox-item-${rol.name}`}
        className="w-full ms-2 text-base font-medium text-gray-900 rounded dark:text-gray-300"
      >
        {rol.name}
      </label>
    </div>
  </li>
))}


    </ul>
        </div>
        </div>
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