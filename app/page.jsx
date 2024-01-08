'use client'
import {useState , useEffect} from 'react'
import { useAuth } from "../AppState";
import { useRouter } from "next/navigation";
import Spinners from './ui/Spinners';
import ButtonAdd from './ui/ButtonAdd';
import PopAddAssistant from './ui/home/PopAddAssistant';
import axios from "./config/axiosconfigClient"
import BoxAssistant from './ui/home/BoxAssistant';
import Button from './ui/Button';

export default function Home() {
  const [showAddAssistant, setShowAddAssistant] = useState(false)
  
  const [isLoading, setIsLoading] = useState(true);
  const { HaveRole ,Role} = useAuth();
  const [data, setData] = useState([""]);
  const router = useRouter();
  
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("/api/Teacher/assistant");
        setData(response.data);
        console.log(`tha data in rolse is ${data.roles}`)
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
  
    getdata(); 
  }, []);

console.log(`data is ${data}`)

  const restartData = async () => {
    try {
      const response = await axios.get("/api/Teacher/assistant");
      setData(response.data);
      setIsLoading(false);
      console.log(`tha data in rolse is  2 ${data.roles}`)

    } catch (e) {
      console.log(e);
    }
  };


  
  
  if (HaveRole([null])) return <Spinners/>;



  else if (HaveRole(["Teacher", "Assistant"])) {
    return (
      <main className="pt-20"> 
        {showAddAssistant && ( <div className="overlay"> <PopAddAssistant restartData={restartData} onCansle={() => setShowAddAssistant(!showAddAssistant)}/> </div>)}
        {/* <div className="text-end"> 
        <Button text="المساعدين"/>
      </div> */}
      <div className="text-end"> 
        <ButtonAdd onClick={() => setShowAddAssistant(!showAddAssistant)} text="اضافة مساعد"/>
      </div>
      {isLoading && <Spinners/>}
      <div className='p-4 grid grid-cols-2 gap-4 2sm:grid-cols-1'> 
      {!isLoading && data.map((da) => (
        <BoxAssistant restartData={restartData}  name={da.name} phone={da.phone} roles={da.roles} id={da.id} key={da.id}/>
        ))}
        </div>


      </main> 
    );
  } else {
    router.push("/login");
  }
}


// bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJUZWFjaGVyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwMTAwNDcxNDkzOCIsImlkIjoiMjciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTW1vMnplIiwiZXhwIjoxNzA0NTY0MjM0fQ.pUPHoQQl3FqOYTe1Tkk324_g80F87X-dSyi0QcZrwAY
// 01002792637
// 01023757596
// 01009677306
// 01095634680