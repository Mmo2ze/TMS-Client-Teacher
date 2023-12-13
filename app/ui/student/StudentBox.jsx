"use client"
import Image from 'next/image'
import img1 from "../../../public/mother.png"
import { useState, useEffect } from "react";
import axios from "../../config/axiosconfigClient";
import Spinners from '@/app/ui/Spinners';


const StudentBox = () => {
// /api/Teacher/student
const [data, setData] = useState("");
const [isLoading, setIsLoading] = useState(true);

console.log(`the student is ${data}`)
useEffect(() => {
const getdata = async () => {
  try {
    const response = await axios.get("/api/Teacher/student");
    setData(response.data);
    setIsLoading(false);

  } catch (e) {
    console.log(e);
  }
};

getdata();
}, []);
    return (
        <> 
            {isLoading && <Spinners/>}
            {!isLoading && data.map((da) => (
            <div className="img_liner px-4 pt-4 flex m-4 rounded-lg flex-col gap-3 md:text-3xl 2sm:relative 2sm:h-40 2sm:text-lg cursor-pointer"> 
        <div className="flex justify-between w-full 2sm:absolute ">     
        <Image src={img1} width={65} height={65}  alt="Picture of the author"/>
        <div className="2sm:absolute top-[70%] right-6"> ثاني ثانوي</div>
        <div className="2sm:absolute top-0 right-6">  {da.student.name} </div>
        </div>

        <div className="flex justify-between w-full   items-center">     
        <div className="2sm:absolute top-[75%] right-2"> شعبة ثانية</div>
        <div className="text-color-text  pb-3.5 2sm:absolute top-[75%] right-[45%] 2sm:text-xl">  {da.student.id}</div>
        <div className="2sm:absolute top-[70%] left-1"> 
        <button type="button" className=" text-green-700 2sm:w-28 w-40  border border-green-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 bg-side10-color   cursor-default">
        مدفوع
        </button> 
        </div>
        </div>
    </div>
            ))}
        </>
    )
}

export default StudentBox