"use client";
import InputAddClass from '@/app/ui/addClass/InputAddClass'
import  { useState , useEffect} from "react";
import axios from "../../config/axiosconfigClient"
import Button from '@/app/ui/Button';

const page = () => {
    const [number , setNumber] = useState("")
    const [whatsappEnabled, setWhatsappEnabled] = useState(false);
    const [data, setData] = useState("");
    const [theId, setTheId] = useState("");
    // const [isOneVisible, setOneVisible] = useState(true);
    const [isTwoVisible, setTwoVisible] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState("");



    const handleWhatsappChange = (value) => {
      setWhatsappEnabled(value === "hosting-big");
    };
const handelSubmit = async () => {
  try {
    console.log("Attempting to update data...");
    const response = await axios.post(`/api/Teacher/student/check`, {
      phone: number,
      hasWhatsapp: whatsappEnabled
    });

    console.log(`Data updated successfully! : ${response.data.isvalid}`);
    // setOneVisible(!response.data.isvalid);
    setTwoVisible(response.data.isvalid);
 
    setTheId(response.data.data.id)
  } catch (error) {
    if(error.response.status === 404){
      alert("الرقم غير موجود")
    }
    else if(error.response.status === 400){
      var message1 = error.response.data.messages[0];
      if(message1 ){
        switch (message1.statusCode) {
          case 302:{
            alert("الرقم خطا");
            break;
          }
          case 301:{
            alert("no whatsapp");
            break;
          }
          default:{
            alert ("something went wrong")
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
    const response = await axios.post(`/api/Teacher/student`, {
      studentId: parseInt(theId, 10),
      classId: parseInt(selectedGrade, 10) 
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

        <div className="one"> 
        <InputAddClass type="number" lable="ادخل رقم الطالب" value={number} onChange={setNumber}/>
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

        <button  type="button" onClick={handelSubmit} className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5  dark:bg-button-color2">
        ارسال
        </button>
        </div>

        <div className={isTwoVisible ? "tow" : "hidden"}> 
        <h1 className="text-xl my-3 text-end text-color-text">رقم الطالب هو : {theId} </h1>
        <label for="countries" class="text-end block my-4 text-xl font-medium text-gray-900 dark:text-white">الرجاء اختيار الصف الذي تريد انضمام الطالب اليه</label>
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
                {da.grade === 'FirstSecondary' && 'أولى ثانوي'}
                {da.grade === 'SecondSecondary' && 'ثاني ثانوي'}
              {da.grade === 'ThirdSecondary' && 'ثالث ثانوي'} /  {da.name}
              </option>
            ))}
        </select>
        <button  type="button" onClick={handelAdd} className=" flex items-center justify-center rounded-lg w-1/2 mt-4 mx-auto focus:outline-none text-white bg-green-600   font-medium  text-lg px-5 py-2.5  dark:bg-button-color2">
        اضافة
        </button>
        </div>




    </div>
  )
}

export default page

