"use client"
import { useState  , useEffect } from "react";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import BoxSection from '@/app/ui/section/BoxSection';
import Spinners from '@/app/ui/Spinners';
import AddIcon from '@mui/icons-material/Add';
import PopAddSection from "@/app/ui/section/PopAddSection";
import axios from "../../../config/axiosconfigClient"


const page = (props) => {
    const [showAddSection , setShowAddSection] = useState(false)
    const [data , setData] = useState("")
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getdata = async () => {
          try {
            const response = await axios.get(`/api/Teacher/class/section/${props.params.id}`);
            setData(response.data);
            setIsLoading(false);

          } catch (e) {
            console.log(e);
          }
        };
      
        getdata(); 
      }, [showAddSection]);
    

      const restartData = async () => {
        try {
          const response = await axios.get(`/api/Teacher/class/section/${props.params.id}`);
          setData(response.data);
          setIsLoading(false);

        } catch (e) {
          console.log(e);
        }
      };

      
    return (
        <div className="pt-20">
            {showAddSection && ( <div className="overlay"> <PopAddSection  restartData={() => getdata()} onCansle={() => setShowAddSection(!showAddSection)} id={props.params.id}/></div>)}
        <div className="p-4"> 
        <div className="flex  align-center justify-between text-color-text">
        <div className="cursor-pointer"> <AccessibilityIcon sx={{ fontSize: 60 }}/></div>
        <div className="cursor-pointer" onClick={() => setShowAddSection(!showAddSection)}> <AddIcon sx={{ fontSize: 60 }}/></div>
        </div>
        {isLoading && <Spinners/>}
        <div> 
{!isLoading && data.map((da) => (
  <BoxSection day={da.day} key={da.id} starttime={da.startTime} endtime={da.endTime} id={da.id} restartData={restartData}/>
  ))}
  </div> 


        </div> 
        </div>
        )
}
export default page


// classId
// : 
// 27
// day
// : 
// "Sunday"
// endTime
// : 
// "03:30:00"
// id
// : 
// 7
// startTime
// : 
// "01:00:00"
// teacherId
// : 
// 27