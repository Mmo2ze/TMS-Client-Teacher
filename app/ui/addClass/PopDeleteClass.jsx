import React from 'react'

const PopDeleteClass = ({onCansle , id ,axios, restartData}) => {

  const handelDelete = async () => {
    try {
      console.log("Attempting to Delete data...");
      await axios.delete(`/api/Teacher/class/${id}`);
      onCansle();
      restartData()
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  return (
    <div className="fixed z-50 py-4 bg-side7-color md:mt-7 rounded-lg w-[96%]  md:w-1/2 mt-2 top-[55%] md:top-1/2 left-1/2 center text-end">

        <h1 className='mb-6 text-3xl text-center text-color-red'>هل انت متأكد من الحذف</h1>
        <p className="text-color-text2 bg-side-color p-2 mb-4">بعد تأكيد الحذف سيتم حذف جميع البيانات الموجودة في هذا الصف</p>
        <div >
        <svg className=" mx-auto mb-8 w-[84px] h-[82px] text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
      </div>
        <div className="flex justify-between px-4 mt-4">
            <button onClick={onCansle} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                
                الغاء
            </button>
            <button onClick={handelDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                تأكيد
            </button>
        </div>
 
        
        
        </div>
  )
}

export default PopDeleteClass


{/* <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg> */}

// #0d1420

// 01095634680
// 01002792637
