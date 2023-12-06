"use client"
import {useState , useEffect} from 'react'
import PopAddClass from '../ui/addClass/PopAddClass'
import Spinners from '../ui/Spinners'
import axios from "../config/axiosconfigClient"
import ClassBox from '../ui/addClass/ClassBox'
import Success from '../ui/toast/Success'
const page = () => {
    const [showAddClass , setShowAddClass] = useState(false)
    const [data, setData] = useState([""]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const getdata = async () => {
        try {
          const response = await axios.get("/api/Teacher/class");
          setData(response.data);
          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
      };
    
      getdata(); 
    }, [showAddClass]);

    const updateData = async () => {
      try {
        const response = await axios.get("/api/Teacher/class");
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };


  return (
    <div className="mt-3 pt-20 ">
      <Success/>
        {showAddClass && ( <div className="overlay"> <PopAddClass onGet={() => getdata()} onCansle={() => setShowAddClass(!showAddClass)}/> </div>)}
        <div className="text-end">
        <button onClick={() => setShowAddClass(!showAddClass)} type="button" className=" focus:outline-none rounded-lg text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium   text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            اضافة صف
        </button>
        </div>
        <div className="relative overflow-x-auto p-4  ">
        {isLoading && <Spinners/>}
        {!isLoading && data.map((da) => (
    <ClassBox   updateData={updateData} name={da.name} id={da.id} basePaymentPrice={da.basePaymentPrice} basePaymentDelay={da.basePaymentDelay} grade={da.grade}/>))}
      </div>
    </div>
  )}
export default page