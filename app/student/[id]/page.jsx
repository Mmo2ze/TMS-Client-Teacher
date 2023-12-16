import React from "react";
import img1 from "../../../public/mother.png";
import Image from "next/image";
import Button from "../../ui/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
const page = (props) => {
  return (
    <div className="pt-20 px-3">
      <div className="img_liner p-4 rounded-lg flex flex-col gap-5">
        <div className="flex justify-between items-center mb-1">
          <Image
            src={img1}
            width={65}
            height={65}
            alt="Picture of the author"
          />
          <div>
            <h1 className="text-xl mb-2 text-side12-color md:text-3xl">
              محمود احمد خالد محسن عبد الله
            </h1>
            <p className="text-end text-side13-color md:text-xl">
              ثالثة ثانوي A
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          {/* <Link to={`https://wa.me/+2${def.parentPhone}`}> */}
          <Link href={`https://wa.me/+201004714938`}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <WhatsAppIcon />
            </button>
          </Link>

          <button
            className={
              true
                ? "paym-details_student bg-green-100 text-green-800 text-lg font-medium mr-2 w-[80px]  h-[45px] p-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                : "paym-details_student bg-red-100 text-red-800 text-lg font-medium mr-2 w-[90px]  h-[45px] p-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
            }
          >
            {true ? "مدفوع" : "غير مدفوع"}
          </button>

          {/* <Link to={`tel:${def.parentPhone}`}> */}
          <Link href={`tel:201004714938`}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <PhoneIcon />
            </button>
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="text-white  flex bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium w-fit  rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 m-auto"
          >
            المصاريف
          </button>
        </div>
      </div>

      <div className="img_liner_2 mt-4 p-2 rounded-lg"> 


      <div className="flex w-full gap-3 text-center mb-8">
        <div className="w-full ">
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ادخل الاسم </label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
      </div>
      <div className="w-full">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">اختار الصف  </label>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      </div>



      <div className="flex w-full gap-3 text-center mb-8">
        <div className="w-full ">
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ادخل الرقم </label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01004714938" required />
      </div>
      <div className="w-full ">
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ادخل رقم ولي الامر </label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01004714938" required />
      </div>
      </div>



      <div className="flex w-full gap-3 text-center mb-8">
        <div className="w-full ">
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ادخل السعر </label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="300" required />
      </div>
      <div className="w-full ">
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">  اقصي تاخير </label>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7" required />
      </div>
      </div>

      <div className="flex justify-center items-center gap-10">
        <div className="flex flex-col items-center">
          <label htmlFor="default-radio-1" className="mb-2 ms-2 text-xl   font-medium text-gray-900 dark:text-gray-300">طالب</label>
          <input id="default-radio-1" type="radio" defaultValue name="default-radio" className="w-10 h-8 rounded-lg text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="default-radio-2" className="mb-2 ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">طالبة</label>
          <input defaultChecked id="default-radio-2" type="radio" defaultValue name="default-radio" className="w-10 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </div>

      </div>
    </div>
  );
};

export default page;
