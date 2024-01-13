"use client"
import { useState, useEffect } from 'react';
import StudentBox from "../ui/student/StudentBox";
import PopAttendance from "../ui/PopAttendance";
import axios from "../config/axiosconfigClient";
import Spinners from '../ui/Spinners';
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [showPop, setShowPop] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentId , setStudentId] = useState("");
  const [currentStudent, setCurrentStudent] = useState({});
 
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const fetchData = async () => {
        try {
          const url = searchWord ? `/api/Teacher/student/search/${searchWord}` : '/api/Teacher/student';
          const response = await axios.get(url);
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, 2000); 
      return () => clearTimeout(delaySearch);
  }, [searchWord]);

  return (
    <div className="pt-20 px-2 text-end">
   <ToastContainer />


{showPop && ( <div className="overlay">     <PopAttendance placeholder="مدة التأخير" onCansle={() => setShowPop(!showPop)} studentName={currentStudent.name} studentId={currentStudent.id} />  </div>)}


      <h1 className="mb-5 text-3xl font-bold text-side12-color">تسجيل حضور طالب</h1>
      <input
        type="search"
        id="searchInput"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-end"
        placeholder="ادخل الرقم"
        required
      />
      {isLoading ? <Spinners /> : (data.map((student) => {

        return (
<div onClick={() => {
  setShowPop(!showPop);
  setCurrentStudent({
    name: student.student.name,
    id:student.privateId
  });
}}>
  <StudentBox name={student.student.name} id={student.privateId} key={student.student.id} />
</div>
  );
})
      )}
    </div>
  );
};

export default Page;
