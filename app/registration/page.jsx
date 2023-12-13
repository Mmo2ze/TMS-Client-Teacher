"use client"
import React, { useRef } from 'react'
import Scanner from '../ui/scanner/Scanner'

const page = () => {
  const scaner = useRef(null);


  function success(result) {
    scaner.current.pause();
    console.log(`the result scanner is ${result}`)
    request(`api/Student/${result}`)
      .then((response) => {
        setStudent(response.data);
        setShowpop(true);
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
    <div>    
           <div className="main-content">
              <Scanner success={success} scanner={scaner} />
            </div>
    </div>
  )
}

export default page