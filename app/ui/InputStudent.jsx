import React from 'react'

const InputStudent = ({lable ,  placeholder}) => {
  return (
    <div className="w-full ">
    <label htmlFor="first_name" className=" text-end pr-2 block mb-2 text-xl font-medium text-gray-900 dark:text-white"> {lable} </label>
    <input readOnly   type="text" id="first_name" className="text-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white placeholder:text-xl dark:text-white " placeholder={placeholder} required />

  </div>
  )
}

export default InputStudent