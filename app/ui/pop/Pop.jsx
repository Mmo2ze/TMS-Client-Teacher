import "./pop.css"
import Imagesman from "../../assets/images/6769264_60111.jpg"
import Imagesweman from "../../assets/images/mother.png"
import { Button } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import request from "../../config/axiosconfigClient";
import { endLodingToast, lodingToast, sendToast } from "../../func/toast";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function Pop({ scanner, setShowpop, studentResponse }) {
  const [degree, setdegree] = useState();
  const [lateness, setlateness] = useState();
  const handleSave = async () => {
    var toastid = lodingToast()
    request.post(
      `api/Teacher/student/attendance?studentId=${studentResponse.student.privateId}&lateMints=${lateness}`
    )
      .then((response) => {
        endLodingToast(toastid, "added Successfully", "success");
        handleCansle();
      })
      .catch((error) => {
        handleCansle();
        if (
          error.response.data.title == "One or more validation errors occurred."
        )
          endLodingToast(toastid, "Invalid QRCode", "error");

        else if (error.response.data.errors != null) {
          endLodingToast(
            toastid,
            error.response.data.errors[0].message,
            "error"
          );
        } else {
          endLodingToast(toastid, "Please, try aggain later....", "error");
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
    <div className={`info_details-student  ${0 === 0 ? "blue" : "perple"}`}>
      <div className="header_the-student-info">

        <div className="images-student">
          <img src={studentResponse.student.gender === "Male" ? Imagesman : Imagesweman} />
        </div>
        <div className="the_number-in_student">
          <h2>{studentResponse.student.privateId}</h2>
        </div>
        <div className="detail">
          <h2 className="name_students">{studentResponse.student.student.name}</h2>
          <h2 className="name_className">{studentResponse.className}</h2>

        </div>
      </div>
      {/* <button className="condition bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400" color="red"
    >
                        {student.IsPayed ? "Payed" : "Pending"}
                      </button> */}
      <div className="input-ane_sent-degree">


        <input
          className="input_the-degree"
          type="number"
          placeholder="lateness"
          value={lateness}
          min={5}
          max={60}
          onChange={handelLatenessChange}
        />
      </div>
      <Button variant="contained" endIcon={<SendIcon />} className="save_students" onClick={handleSave}>Save</Button>
      <Button variant="contained" className="cansle-students" onClick={handleCansle}>cancel </Button>

    </div>

  )
}

export default Pop



