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
  const [shwoNameParent, setShowNameParent] = useState(false);
  const [nameStudent, setNameStudent] = useState("");
  const [idStudent, setIdStudent] = useState("");
  const nameParts = theName.split(" ");
  const firstName = nameParts[0];
  const [gender, setGender] = useState("");
  const [wantToAddParentNumber, setWantToAddParentNumber] = useState(false);
  const [perentPhone ,setPerentPhone] = useState([])
  const [valuePerentNumber , setValuePerentNumber] = useState("")
  const [nameParent , setNameParent] = useState("")
  const [whatsappEnabledParent, setWhatsappEnabledParent] = useState(false);
  const [showDetailParent , setShowDetailParent] = useState(false)
  const [DetailParent , setDetailParent] = useState("")
  const [DetailParentId , setDetailParentId] = useState("")
  const [DetailParentIdRegist , setDetailParentIdRegist] = useState("")
  const [showAddParentButton, setShowAddParentButton] = useState(true);

 const handleWhatsappChange = (value) => {
    setWhatsappEnabled(value === "hosting-big");
  };
  const handleWhatsappChangeParent = (value) => {
    setWhatsappEnabledParent(value);
  };

    const getParent = async () => {
    var toastID = lodingToast();

      try {
        const response = await axios.get(`/api/Teacher/parent/check/${valuePerentNumber}`);
        setPerentPhone(response.data.isvalid);
        if (response.data.isvalid) {
          endLodingToast(toastID, "تم اضافة ولي الامر بنجاح", "success");
          setShowDetailParent(true)
          setDetailParent(response.data.data.name)
          setDetailParentId(response.data.data.id)
          setShowAddParentButton(false);

        }
      } catch (error) {
        if (error.response.status === 404) {
          setShowNameParent(!shwoNameParent);
          endLodingToast(toastID, " ادخل اسم ولي الامر", "success");
        } else if (error.response.status === 400) {
          var message1 = error.response.data.messages[0];
          if (message1) {
            switch (message1.statusCode) {
              case 302: {
                endLodingToast(toastID, 'الرقم الذي ادخلته حطأ', "error");
                break;
              }
              case 301: {
                endLodingToast(toastID, "الرقم الذي ادخلته ليس عليه واتس اب", "error");
                break;
              }
              default: {
                endLodingToast(toastID, "هنالك مشكلة الرجاء المحاولة مرة اخرى", "error");
                break;
              }
            }
          }
        }
      }
    };

    const handelRegistParent = async () => {
      var toastID = lodingToast();
  
      try {
        console.log("Attempting to update data...");
        const requestData = {
          employee: {
            name: nameParent,
            phone: valuePerentNumber,
            gender: 0
          },
          whatsappRequied: whatsappEnabledParent,
        };
    
        const response = await axios.post(
          `/api/Teacher/parent/register`,
          requestData
        );
        setDetailParentId(response.data.data.id)
 
        endLodingToast(toastID, " تم التسجيل  بيانات ولي الامر", 'success');
        // response.data.id
      } catch (error) {
        console.error("Error updating data:", error);
        endLodingToast(toastID, "هذا الرقم ليس عليه واتس اب", 'error');
  
      }
    };
 
  const handelRegist = async () => {
    var toastID = lodingToast();

    try {
      console.log("Attempting to update data...");
      const requestData = {
        employee: {
          name: nameStudent,
          phone: number,
          gender: gender
        },
        whatsappRequied: whatsappEnabled,
      };
  
      const response = await axios.post(
        `/api/Teacher/student/register`,
        requestData
      );
      console.log("Data updated successfully!");
      setTwoVisible(!isTwoVisible);
      setIdStudent(response.data.id);
  

      endLodingToast(toastID, " تم التسجيل بنجاح الرجاءالرجاء اختيار صف", 'success');
      // response.data.id
    } catch (error) {
      console.error("Error updating data:", error);
      endLodingToast(toastID, "هذا الرقم ليس عليه واتس اب", 'error');

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
  

      endLodingToast(toastID, response.data.isvalid ? "تم بنجاح!" : 'فشل!', response.data.isvalid ? 'success' : 'error');
      // endLodingToast(toastID, response.data.isvalid ? "تم بنجاح!" : 'فشل!');
  
    } catch (error) {
      if (error.response.status === 404) {
        setShowNameStudent(!shwoNameStudent);
        endLodingToast(toastID, " ادخل بيانات الطالب ", "success");
      } else if (error.response.status === 400) {
        var message1 = error.response.data.messages[0];
        if (message1) {
          switch (message1.statusCode) {
            case 302: {
              endLodingToast(toastID, 'الرقم الذي ادخلته حطأ', "error");
              break;
            }
            case 301: {
              endLodingToast(toastID, "الرقم الذي ادخلته ليس عليه واتس اب", "error");
              break;
            }
            default: {
              endLodingToast(toastID, "هنالك مشكلة الرجاء المحاولة مرة اخرى", "error");
              break;
            }
          }
        }
      }
    }
  };

  const handelAdd = async () => {
    var toastID = lodingToast();

    try {
      console.log("Attempting to update data...");
      const studentIdToSend = theId
        ? parseInt(theId, 10)
        : parseInt(idStudent, 10);

      const response = await axios.post(`/api/Teacher/student`, {
        studentId: studentIdToSend,
        classId: parseInt(selectedGrade, 10),
        parentId : DetailParentId
      });
      endLodingToast(toastID, " ادخل بيانات الطالب ", "success");
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
 
        <div>
          <h3 className="mb-5 text-center pt-4 text-2xl font-medium text-gray-900 dark:text-white">
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
                defaultChecked  
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

        {shwoNameStudent && ( 
          <> 
          <InputAddClass
            type="text"
            lable="ادخل اسم الطالب"
            value={nameStudent}
            onChange={setNameStudent}
            />
            <div className="flex justify-center items-center gap-5 my-4 "> 
            <div className="flex flex-col gap-4 items-center justify-center"> 
            <label htmlFor="male" className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">
  ذكر
</label>
<input
  type="radio"
  id="male"
  name="gender"
  value="male"
  checked={gender === "male"}
  onChange={() => setGender("male")}
  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
/>
</div>
<div className="flex flex-col gap-4 items-center justify-center"> 

<label htmlFor="female" className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">
  أنثى
</label>
<input
  type="radio"
  id="female"
  name="gender"
  value="female"
  onChange={() => setGender("female")}
  checked={gender === "female"}
  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

/>
</div>
</div>

            </>
        )}



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
            الطالب  :{" "}
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
          <h1 className="mb-5 text-center pt-4 text-2xl font-medium text-gray-900 dark:text-white 2sm:w-full">هل تريد اضافة رقم ولي امر</h1>
         <div className="flex justify-center -items-center gap-6">  
          <div className="flex flex-col-reverse justify-center gap-4 items-center ">
          <input id="default-radio-1" type="radio" onChange={() => {setWantToAddParentNumber(true);}}  defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-radio-1" className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300"> نعم</label>
        </div>
        <div className="flex flex-col-reverse justify-center gap-4 items-center">
          <input defaultChecked id="default-radio-2" type="radio" onChange={() => {setWantToAddParentNumber(false);}} defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-radio-2" className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">لا </label>
        </div> 
        </div>
        {wantToAddParentNumber && (
          <div className="duration-1000 transition-transform  "> 
  <InputAddClass
  value={valuePerentNumber}
  onChange={setValuePerentNumber}
    type="number"
    lable="ادخل رقم ولي الأمر"
    />
    {showDetailParent && (

  <h3 className="text-end my-6 text-xl">  الاسم : <span className="text-color-text text-xl">{DetailParent}</span> </h3>
)}
    {shwoNameParent && (
      <div>

        <InputAddClass
        value={nameParent}
        onChange={setNameParent}
        type="text"
        lable="ادخل اسم ولي الأمر"
        />

        <h3 className="mb-5 text-center pt-4 text-2xl font-medium text-gray-900 dark:text-white">
              الواتس اب
          </h3>
        <div>
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input onChange={() => handleWhatsappChangeParent(true)}  id="bordered-radio-1" type="radio" defaultValue name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">نعم اريد </label>
        </div>
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input onChange={() => handleWhatsappChangeParent(false)} defaultChecked id="bordered-radio-2" type="radio" defaultValue name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">لا </label>
        </div>
      </div>
<button
     onClick={handelRegistParent}
            type="button"
            className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5  dark:bg-button-color2"
          >
            تسجيل رقم ولي الامر
          </button>
        </div>
    )}



{!shwoNameParent && showAddParentButton && (
     <button
     onClick={getParent}
            type="button"
            className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600  2sm:w-full font-medium  text-lg px-5 py-2.5  dark:bg-button-color2"
          >
            اضافة رقم ولي الامر
          </button>
              )}
    </div>
)}

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

// 01004714854
// {
//   "children": [],
//   "gender": "Male",
//   "id": 3,
//   "name": "alith",
//   "phone": "01004714244"
// }