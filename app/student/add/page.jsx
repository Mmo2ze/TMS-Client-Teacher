"use client";
import InputAddClass from "@/app/ui/addClass/InputAddClass";
import { useState, useEffect } from "react";
import axios from "../../config/axiosconfigClient";
import Button from "@/app/ui/Button";
const {
  endLodingToast,
  lodingToast,
  sendToast,
} = require("./../../func/toast");
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [number, setNumber] = useState("");
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [data, setData] = useState("");
  const [theId, setTheId] = useState("");
  const [theName, setTheName] = useState("");
  // const [isOneVisible, setOneVisible] = useState(true);
  const [isTwoVisible, setTwoVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [shwoNameStudent, setShowNameStudent] = useState(false);
  const [nameStudent, setNameStudent] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const nameParts = theName.split(" ");
  const firstName = nameParts[0];
  const handleWhatsappChange = (value) => {
    setWhatsappEnabled(value === "hosting-big");
  };

  const handelRegist = async () => {
    try {
      console.log("Attempting to update data...");
      const requestData = {
        employee: {
          name: nameStudent,
          phone: number,
        },
        whatsappRequied: whatsappEnabled,
      };

      const response = await axios.post(
        `/api/Teacher/student/regist`,
        requestData
      );
      console.log("Data updated successfully!");
      setTwoVisible(!isTwoVisible);
      setIdStudent(response.data.id);
      // response.data.id
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handelSubmit = async () => {
    var toastID = lodingToast();
    try {
      console.log("Attempting to update data...");
      const response = await axios.post(`/api/Teacher/student/check`, {
        phone: number,
        hasWhatsapp: whatsappEnabled,
      });

      console.log(`Data updated successfully! : ${response.data.isvalid}`);
      // setOneVisible(!response.data.isvalid);
      setTwoVisible(response.data.isvalid);
      

      setTheId(response.data.data.id);
      setTheName(response.data.data.name);
    } catch (error) {
      if (error.response.status === 404) {
        setShowNameStudent(!shwoNameStudent);
      } else if (error.response.status === 400) {
        var message1 = error.response.data.messages[0];
        if (message1) {
          switch (message1.statusCode) {
            case 302: {
              endLodingToast(toastID, 'invalid phone', "error");
              break;
            }
            case 301: {
              endLodingToast(toastID, "no whatsapp", "error");
              break;
            }
            default: {
              alert("something went wrong");
              break;
            }
          }
        }
      }
    }
  };

  const handelAdd = async () => {
    try {
      console.log("Attempting to update data...");
      const studentIdToSend = theId
        ? parseInt(theId, 10)
        : parseInt(idStudent, 10);

      const response = await axios.post(`/api/Teacher/student`, {
        studentId: studentIdToSend,
        classId: parseInt(selectedGrade, 10),
      });

      console.log(`Data updated successfully! : ${response.data.isvalid}`);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("/api/Teacher/class");
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getdata();
  }, []);

  return (
    <div className="pt-20 px-4 img_liner pb-3 m-1 rounded-lg">
      <ToastContainer />

      <div className="one">
        <InputAddClass
          type="number"
          lable="ادخل رقم الطالب"
          value={number}
          onChange={setNumber}
        />
        {shwoNameStudent && (
          <InputAddClass
            type="text"
            lable="ادخل اسم الطالب"
            value={nameStudent}
            onChange={setNameStudent}
          />
        )}

        <div>
          <h3 className="mb-5 text-center pt-4 text-lg font-medium text-gray-900 dark:text-white">
            خدمة رسائل الواتس اب
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="hosting-big"
                className="hidden peer"
                onChange={() => handleWhatsappChange("hosting-big")}
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex flex-row-reverse items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    تفعيل رسائل الواتس اب على هذا الرقم
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                className="hidden peer"
                required
                onChange={() => handleWhatsappChange("hosting-small")}
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex flex-row-reverse items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-[lg 2sm:text-[16px] flex-row-reverse font-semibold">
                    غير مهتم برسائل الواتس اب على هذا الرقم
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>

        {!shwoNameStudent && (
          <button
            type="button"
            onClick={handelSubmit}
            className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5  dark:bg-button-color2"
          >
            ارسال
          </button>
        )}

        {shwoNameStudent && (
          <button
            type="button"
            onClick={handelRegist}
            className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5  dark:bg-button-color2"
          >
            تسجيل
          </button>
        )}
      </div>

      {isTwoVisible && (
        <div>
          <h1 className="text-xl my-3 text-end ">
            {" "}
            الطالب هو :{" "}
            <span className="text-color-text text-xl">
              {theName || nameStudent}
            </span>{" "}
          </h1>
          <h1 className="text-xl my-3 text-end ">
            رقم الطالب هو :{" "}
            <span className="text-color-text text-xl">
              {theId || idStudent}
            </span>{" "}
          </h1>
          <label
            for="countries"
            class="text-end block my-4 text-xl font-medium text-gray-900 dark:text-white"
          >
            الرجاء اختيار الصف الذي تريد انضمام الطالب{" "}
            <span className="px-2 text-color-text text-xl">{firstName} </span>{" "}
            اليه
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            id="countries"
            className=" text-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>اختيار الصف</option>
            {data &&
              data.map((da) => (
                <option key={da.id} value={da.id}>
                  {da.grade === "FirstSecondary" && "أولى ثانوي"}
                  {da.grade === "SecondSecondary" && "ثاني ثانوي"}
                  {da.grade === "ThirdSecondary" && "ثالث ثانوي"} / {da.name}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={handelAdd}
            className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5  dark:bg-button-color2"
          >
            اضافة
          </button>
        </div>
      )}
    </div>
  );
};

export default page;

// 01023044584
// no whatsapp
