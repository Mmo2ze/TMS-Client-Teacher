import React from 'react'

const ButtonAdd = ({text , onClick}) => {
  return (
    <div>
    <button onClick={onClick} type="button" className=" focus:outline-none rounded-lg text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium   text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
             {text}
     </button>
    </div>
  )
}

export default ButtonAdd