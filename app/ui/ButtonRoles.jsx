

const ButtonRoles = ({text}) => {
  return (
    <div>
      <button  type="button" className="rounded-lg  text-white  font-medium  w-fit  text-base px-5 py-2.5 me-2 mb-2  2sm:text-xs   img-roles">
    <div className="flex gap-2 items-center justify-between	"> 
    <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
    <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
      </svg>
            {text}
    </div>
        </button>
    </div>
  )
}

export default ButtonRoles