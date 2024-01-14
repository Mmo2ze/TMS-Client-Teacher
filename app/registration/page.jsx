"use client";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef } from "react";
import Scanner from "../ui/scanner/Scanner";

const page = () => {
  const scaner = useRef(null);

  function success(result) {
    scaner.current.pause();
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
    <div className="add-page">
      <ToastContainer />

        <div className="main-content">
          <Scanner success={success} scanner={scaner} />
         
        </div>
    </div>
  );
};

export default page;
