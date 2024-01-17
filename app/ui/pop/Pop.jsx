import "./pop.css"
import Imagesman from "../../assets/images/6769264_60111.jpg"
import Imagesweman from "../../assets/images/mother.png"
import { Button } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import request from "../../config/axiosconfigClient";
const {
  endLodingToast,
  lodingToast,
  sendToast,
} = require("./../../func/toast");
import { useState } from "react";
import Image from 'next/image'

function Pop({ scanner, setShowpop, studentResponse }) {
  const [degree, setdegree] = useState();
  const [lateness, setlateness] = useState();
  const handleSave = async () => {
    var toastID = lodingToast()
    const latenessValue = lateness === undefined  ? 0 : lateness;

    request.post(
      `api/Teacher/student/attendance?studentId=${studentResponse.student.privateId}&lateMints=${latenessValue}`
      )
      .then((response) => {
        endLodingToast(toastID, "5الرقم الذي ادخلته حطأ", "error");
        handleCansle();
      })
      .catch((error) => {
        console.log(`error is ${error.statusCode}`)
        handleCansle();
        if (error.response.status === 404) {    
          endLodingToast(toastID, "1الرقم الذي ادخلته حطأ", "error");
        } else if (error.response.status === 400) {
          var message1 = error.response.data.messages[0];
          if (message1) {
            switch (message1.statusCode) {
              case 400: {
                endLodingToast(toastID, "2الرقم الذي ادخلته حطأ", "error");
                break;
              }
              case 302: {
                endLodingToast(toastID, "3الرقم الذي ادخلته حطأ", "error");
                break;
              }
                   case 302: {
                    endLodingToast(toastID, "4الرقم الذي ادخلته حطأ", "error");
                    break;
              }
              default: {
                endLodingToast(
                  toastID,
                  "هنالك مشكلة الرجاء المحاولة مرة اخرى",
                  "error"
                );
              }
            }
          }
        }
      });
  };


 

  const handleCansle = () => {
    scanner.current.resume()
    setShowpop(false);
  }

    const handelDegreeChange = (e) => {
      setdegree(e.target.value);
    };

  const handelLatenessChange = (e) => {
    setlateness(e.target.value)
  }
  return (
    <div className="img_liner absolute top-[40%] left-[5%] w-[90%] rounded-lg h-[40%]">
      <div className="flex justify-between w-full p-4 items-center"> 
      <div> 
      <Image src={Imagesweman} width={65} height={65}  alt="Picture of the author"/>
      </div>
      <div>
      <h2 className="text-side12-color text-3xl">{studentResponse.student.privateId}</h2>
      </div>

      <div className="flex flex-col text-side12-color items-end">
      <h1 className="text-3xl mb-4">{studentResponse.student.student.name}</h1>
      <h1 className="text-xl text-side13-color">{studentResponse.student.className}</h1>

      </div>
      </div>
   
      <div className="w-[90%] mx-auto mt-6 direction_rtl">
        <input type="number" id="first_name" value={lateness} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="مدة التأخير" required />
      </div>

      <div> 
      <Button variant="contained" endIcon={<SendIcon />} className="save_students" onClick={handleSave}>Save</Button>
      <Button variant="contained" className="cansle-students" onClick={handleCansle}>cancel </Button>
      </div>

    </div>

  )
}

export default Pop



