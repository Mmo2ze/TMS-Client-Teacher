import React from 'react'

const Button = ({text}) => {
  return (
    <div>
      <button  type="button" className="rounded-lg focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5 me-2 mb-2 dark:bg-button-color2">
            {text}
        </button>
    </div>
  )
}

export default Button