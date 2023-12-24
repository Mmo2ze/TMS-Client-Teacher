"use client"
import {useState , useEffect} from 'react'
import axios from "../config/axiosconfigClient"
import Spinners from '@/app/ui/Spinners';


const page = () => {
  const [data, setData] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenStudent, setIsDropdownOpenStudent] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("/api/Teacher/class");
        setData(response.data);
        setIsLoading(false);

      } catch (e) {
        console.log(e);
      }
    };
  
    getdata(); 
  }, []);


  const handleDropdownOpen = () => {
    if (isDropdownOpenStudent) {
      setIsDropdownOpenStudent(false);
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownOpenStudent = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
    setIsDropdownOpenStudent(!isDropdownOpenStudent);
  };



  return (
    <div className="pt-20 px-4 text-end ">

      <div className="flex justify-between gap-6 ">
          <div className="flex-1"> 
      <div className='relative'>

      <button
              id="dropdownBgHoverButton"
              data-dropdown-toggle="dropdownBgHover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleDropdownOpenStudent}
            >
 اختيار طالب
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
} w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-14 right-0 `}
>          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-4" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input defaultChecked id="checkbox-item-5" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Checked state</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-6" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
        </div>
      </li>
    </ul>
  </div>
</div>

        </div>
      <div className="flex-1"> 
      <div className='relative'>

      <button
              id="dropdownBgHoverButton"
              data-dropdown-toggle="dropdownBgHover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleDropdownOpen}
            >
 اختيار صف
<svg
className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
isDropdownOpen ? "rotate-180" : ""
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
isDropdownOpen ? "block" : "hidden"
} w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-14 right-0`}
>         
 <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-4" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input defaultChecked id="checkbox-item-5" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Checked state</label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-6" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
        </div>
      </li>
    </ul>
  </div>
</div>

        </div>

      </div>
      <div className="flex justify-center my-12"> 
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        طباعة الكروت
      </button>
      </div>

    </div>
  )
}

export default page