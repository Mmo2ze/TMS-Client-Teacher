import {useState } from 'react'
import Button from '../Button'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import styles from "./classBox.css"
import PopUpdateClass from "./PopUpdateClass"
import DeleteIcon from '@mui/icons-material/Delete';
import PopDeleteClass from "./PopDeleteClass"
const ClassBox = ({name , basePaymentPrice , basePaymentDelay , grade , id ,  updateData }) => {
  const [showUpdate , setShowUpdate] = useState(false)
  const [sureDelete , setSureDelete] = useState(false)

  // const handleUpdate = () => {
  //   setShowUpdate(!showUpdate);
  // };

const col = showUpdate


  return (
    <div className={`2sm:h-64 2sm:text-xl 2sm:rounded-lg img_liner md:flex md:flex-col md:gap-8 md:p-6 md:rounded-lg md:text-2xl text-bold mb-4 relative`}>
      {sureDelete && (<div className="overlay"><PopDeleteClass id={id} restartData={updateData}  onCansle={() => {
            setSureDelete(!sureDelete);
       
          }} /> </div> )}



{showUpdate && (<div className="overlay">
        <PopUpdateClass
          onCansle={() => {
            setShowUpdate(!showUpdate);
            updateData();
          }}
          initialId={id}
          initialName={name}
          initialPaymentPrice={basePaymentPrice}
          initialPaymentDelay={basePaymentDelay}
          initialGrade={grade}
        />
        </div>
      )}
        <div className='md:flex md:justify-between'>
        <h1 className='text-color-text md:absolute md:bottom-10 md:left-[47%] 2sm:absolute 2sm:bottom-5 2sm:left-6'> <span>{basePaymentDelay}</span> <EventAvailableIcon/></h1> 
        <div className="flex gap-6"> 
        <h1 onClick={() => setSureDelete(!sureDelete)} className='text-red-600 cursor-pointer 2sm:absolute top-[20%] left-4'> <DeleteIcon /></h1>
        <h1 onClick={() => setShowUpdate(!showUpdate)} className='text-color-text cursor-pointer 2sm:absolute top-[20%] left-16'> <EditIcon /></h1>
        </div>

        <h1 className="2sm:absolute top-2  left-[40%] 2sm:text-xl"> {grade === 'FirstSecondary' && 'أولى ثانوي'}
              {grade === 'SecondSecondary' && 'ثاني ثانوي'}
              {grade === 'ThirdSecondary' && 'ثالث ثانوي'}</h1>
        <h1 className='text-color-text 2sm:absolute bottom-5 right-6'><span>{basePaymentPrice}</span> <AttachMoneyIcon/> </h1>
        </div>
        <div className='md:flex md:justify-between'>
        <div className='md:flex md:flex-col '>
        <h1 className="md:mb-6 2sm:absolute top-[40%] right-7 "> <span className="text-color-text">8</span> &nbsp; <PersonIcon/> </h1>
        <div className="2sm:absolute top-[55%] right-2" > 
        <Button text="عرض" />
        </div> 
        </div>
        <h1 className='text-color-text 2sm:text-lg 2sm:absolute top-[20%] right-7'>{name}</h1>
        <div className='md:flex md:flex-col md:items-end'>
        <h1 className="md:mb-6 2sm:absolute top-[40%] left-6"> <span className="text-color-text">6</span> &nbsp; <AccessTimeIcon/></h1>
        <div className="2sm:absolute top-[55%] left-2" > 
        <Button text="عرض" />
        </div>        
        </div>
        </div>
    </div>
  )
}
export default ClassBox


