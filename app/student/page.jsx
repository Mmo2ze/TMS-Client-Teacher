import AddIcon from '@mui/icons-material/Add';
import StudentBox from "../ui/student/StudentBox"
const page = () => {
    return (
        <div className="pt-20"> 
            
            <div className="flex gap-2 p-3 items-center text-color-text text-end"> 
            <div className="flex-1">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" autoComplete='off' className="block text-end w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="البحث عن طالب" required />
        </div>
      </div>
      <div className="cursor-pointer"> 
        <AddIcon sx={{ fontSize: 60 }}/>
      </div>
      </div>
      <div> 
        <StudentBox/>
        <StudentBox/>
        <StudentBox/>
        <StudentBox/>
        <StudentBox/>
        <StudentBox/>
      </div>





            </div>
    )

}

export default page

{/* <button type="button" className="text-green-700  border border-green-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 bg-side-color   cursor-default">
مدفوع</button> */}

// #003de8
//#31c48d