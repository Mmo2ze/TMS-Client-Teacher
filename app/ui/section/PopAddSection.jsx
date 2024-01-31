"use client";
import React, { useState, useEffect } from "react";
import InputAddClass from "../addClass/InputAddClass";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import ButtonAdd from "../ButtonAdd";
import "react-toastify/dist/ReactToastify.css";
const {
  endLodingToast,
  loadingToast,
  sendToast,
} = require("../../func/toast");
import { ToastContainer, toast } from "react-toastify";

const PopAddSection = ({ id, onCansle, restartData ,axios}) => {
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [duration, setDuration] = useState("");
  const [endTime, setEndTime] = useState("00:00"); 


  useEffect(() => {
    if (start) {
      const durationInMinutes = duration
        ? parseInt(duration.split(":")[0]) * 60 +
          parseInt(duration.split(":")[1])
        : 0;
      const startInMinutes =
        parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
      const endInMinutes = startInMinutes + durationInMinutes;

      const hours = Math.floor(endInMinutes / 60);
      const minutes = endInMinutes % 60;

      const seconds = 0;

      setEndTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }
  }, [start, duration]);

  const handelUpdate = async () => {
    var toastID = loadingToast();

    try {
      console.log("Attempting to update data...");
      const formattedStartTime = start ? `${start}:00` : "";
      const formattedEndTime = endTime
      ? `${endTime.split(":").slice(0, 2).join(":")}:00`
      : ""; 
      
      if (!id || !day || !formattedStartTime || !formattedEndTime) {
        console.error("يرجى تعبئة جميع الحقول");
        endLodingToast(toastID, "يرجى تعبئة جميع الحقول", "error");
        return;
      }
      await axios.post(`/api/v1/Teacher/section`, {
        classId: id,
        day: day,
        starttime: formattedStartTime,
        endTime: formattedEndTime,
        id: 0,
      });
      endLodingToast(toastID, " تم اضافة الحصة  بنجاح", "success");
      onCansle();
      restartData();
    } catch (error) {
      var message1;

      if (error.response && error.response.data && error.response.data.messages) {
        message1 = error.response.data.messages[0];
      }
      if (message1) {
        switch (message1.statusCode) {
          case 303: {
            endLodingToast(toastID, "تم حجز هذا الوقت من قبل", "error");
            break;
          }
          default: {
            endLodingToast(toastID, " ?", "error");
            break;
          }
        }
      } 

    }
  };

  return (
    <div className=" fixed  w-[90%] md:w-1/2 p-4 rounded-lg top-[55%] md:top-1/2 left-1/2 center bg-side4-color z-40">
      <div>
        <select
          id="countries"
          onChange={(e) => setDay(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-end"
        >
          <option selected>اختر اليوم</option>
          <option value="Saturday">السبت</option>
          <option value="Sunday">الاحد</option>
          <option value="Monday">الاثنين</option>
          <option value="Tuesday">الثلاثاء</option>
          <option value="Wednesday">الاربعاء</option>
          <option value="Thursday">الخميس</option>
          <option value="Friday">الجمعة</option>
        </select>
      </div>
      <InputAddClass
        lable="وقت البدء"
        type="time"
        value={start}
        onChange={setStart}
      />
      <h2 className="my-3 text-lg text-end">المدة</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimeField", "TimeField", "TimeField"]}>
          <TimeField
            variant="standard"
            className="noBorder"
            inputProps={{
              style: { color: "white" },
              className: "noOutline",
            }}
            onChange={(newValue) => {
              setDuration(newValue.format("HH:mm"));
            }}
            format="HH:mm"
          />
        </DemoContainer>
      </LocalizationProvider>
      <div className="flex justify-between mt-3">
        <button
          onClick={onCansle}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          الغاء
        </button>

        <ButtonAdd text="ارسال" onClick={handelUpdate} />
      </div>
    </div>
  );
};

export default PopAddSection;
