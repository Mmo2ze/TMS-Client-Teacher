import React from 'react'

const InputAddClass = ({lable , value , onChange  , type}) => {
    const handleChange = () => {
        onChange(event.target.value);
      };
  return (
    <div>
    <label htmlFor="first_name" className="  block mb-2  mt-4 text-lg font-medium text-gray-900 dark:text-white">{lable}</label>
    <input onChange={handleChange} value={value} type={type} id="first_name" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
  </div>
  )
}

export default InputAddClass