"use client"
import {useState , useEffect} from 'react'
import axios from "../config/axiosconfigClient"


const page = () => {
  const [data, setData] = useState([""]);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("/api/Teacher/class");
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
  
    getdata(); 
  }, []);
  return (
    <div className="pt-20 px-4 ">

    </div>
  )
}

export default page