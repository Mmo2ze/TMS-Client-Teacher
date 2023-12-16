"use client"
import React, {useState , useRef } from 'react'
import Scanner from '../ui/scanner/Scanner'
import { endLodingToast, lodingToast, sendToast } from "../func/toast";
import axios from "../config/axiosconfigClient"
const page = () => {
  const [student, setStudent] = useState({});

  const scaner = useRef(null);


  function success(result) {
    scaner.current.pause();
    axios.get(`api/Student/${result}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        setTimeout(() => {
          scaner.current.resume();
        }, 2000);

        if (
          error.response.data.title == "One or more validation errors occurred."
        )
          sendToast("Invalid QR ", "error");
        else if (error.response.status == 404) {
          sendToast("Student Not found", "error");
        } else {
          sendToast("Please, try aggain later....", "error");
        }
      });
  }




  return (
    <div className='pt-20 page'>    
      <>
          <div className="main-conten">
          <Scanner success={success} scanner={scaner} />
          </div>
        </>
    </div>
  )
}

export default page