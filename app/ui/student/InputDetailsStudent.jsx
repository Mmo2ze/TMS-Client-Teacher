import React from 'react'

const InputDetailsStudent = ({lable , value , onChange  , type , enable}) => {
    const handleChange = () => {
        onChange(event.target.value);
      };
  return (
    <div className="w-full">
    <label htmlFor="first_name" className="  block pr-4 mb-4  mt-4 text-lg text-start font-medium text-gray-900 dark:text-white">{lable}</label>
    <input   disabled={enable} onChange={handleChange} defaultValue={value} type={type} id="first_name"      className={`${
          enable ? 'cursor-not-allowed bg-gray-200' : '' 
        } 
        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  required />
  </div>
  )
}

export default InputDetailsStudent