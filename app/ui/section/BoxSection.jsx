
import {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PopDeleteSection from "./PopDeleteSection"
const BoxSection = ({day , id , starttime , endtime , axios,restartData }) => {

    const [showPopDelete , setShowPopDelete] = useState(false)
  return (
    <div className='img_liner  my-5 justify-between p-4 w-full  rounded-lg flex 2sm:text-lg md:text-xl'>
      {showPopDelete && (<div className="overlay"><PopDeleteSection  axios={axios} id={id} onCansle={() =>setShowPopDelete(!showPopDelete)} restartData={restartData()}/> </div>)}
        <div>
        <h1 className="mb-4"> {starttime} | {endtime}</h1>
        <h2> {day}</h2>
        <h2> {id}</h2>
        </div>
        <div> 
            <DeleteIcon sx={{ fontSize: 40 }} className="text-red-600 cursor-pointer" onClick={() =>setShowPopDelete(!showPopDelete)}/>
        </div>
    </div>
  )
}

export default BoxSection


