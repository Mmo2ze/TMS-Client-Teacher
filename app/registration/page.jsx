"use client";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import Scanner from "../ui/scanner/Scanner";
import Pop from "../ui/pop/Pop";
import { sendToast } from "../func/toast";
import "react-toastify/dist/ReactToastify.css";
import Spinners from '../ui/Spinners'
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";

const page = () => {
  const scaner = useRef(null);
  const router = useRouter ();
  const {HaveRole, Roles, axios} = useAuth ();
  const [showpop, setShowpop] = useState(false);
  const [student, setStudent] = useState({});
  function success(result) {
    scaner.current.pause();
    console.log(result);
    axios(`api/Teacher/student/${result}`)
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
  if (HaveRole ( [null] )) return <Spinners/>;
  else if (HaveRole ( ["Teacher", "Assistant"] )) {
  return (
    <div className="add-page pt-20">
      <ToastContainer />

      <div className="main-content">
        <Scanner success={success} scanner={scaner} />
        {showpop && (
          <Pop
              axios={axios}
            scanner={scaner}
            setShowpop={setShowpop}
            studentResponse={student}
          />
        )}
      </div>
    </div>
  );
} else {
    router.push ( "/login" );
  }
}


export default page;
