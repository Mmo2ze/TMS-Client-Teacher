"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../config/clientaxaios";
import { useAuth } from "../../AppState";
import { useRouter } from "next/navigation";
import Spinners from "../ui/Spinners";
import {sendToast} from "../func/toast";
import avatar from "../../public/login1.gif"
import Image from 'next/image'

const isEgyptianNumber = (number) => {
  const pattern = /^01\d{9}$/;
  return pattern.test(number);
};

const page = () => {
  const [sentCode, setCodeCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { HaveRole, Roles } = useAuth();
  const [valueCode, setValueCode] = useState("");
  const router = useRouter();
  useEffect(() => {
    if(!HaveRole([null]))
    if (!HaveRole(["UnAuthorized", "HaveTeacherCode"])) {
      router.push("/");
    }
    if (HaveRole(["HaveTeacherCode"])) setCodeCode(true);
  }, [Roles]);
  const handelSubmitCode = async (e) => {
    e.preventDefault();
    var body = {code :valueCode};
    try {
      var response = await axios.post(
        "/api/verify",
        JSON.stringify(body),

      );
      window.location.href = "/";
    } catch (e) {
      if(e.response.status == 400){
        switch (e.response.errors){
          case "invalid code":toast.error("الرمز غير صحيح");break;
          case "code used":{
            sendToast("لقد حاولت اكثرؤ من مرة","error")
            setTimeout(
                () => {
                  window.location.href = "/";
                },
                3000
            )
            break;
          }
          case"code expired": {
            sendToast("انتهت صلاحية الرمز","error")
            setTimeout(
              () => {
                window.location.href = "/";
              },
              3000
            )
            break;
          }
        }
      }
      sendToast("الرمز غير صحيح","error")
    }
  };

  const handleSentCode = async (e) => {
    e.preventDefault();
    if (isEgyptianNumber(phoneNumber)) {
      var body = {phone:phoneNumber};
      try {
        var response = await axios.post(
          "/api/login",
          JSON.stringify(body)
        );
        setCodeCode(true);
      } catch (e) {
        if(e.response.status === 403){
          sendToast("غير مصرح لك بالدخول","error")
      }else toast("حدث خطأ ما")
      }
    } else {
      sendToast("الرقم المدخل غير صحيح. يجب أن يكون بصيغة مصرية صحيحة.","error")
    }
  };
  if (HaveRole([null])) {
    return <Spinners/>;
  }
  if (HaveRole(["UnAuthorized", "HaveTeacherCode", ])) {
    return (
      <>
{/* <div className="absolute 2sm:top-[3%]  z-10"> 

        <Image
      src={avatar}
      width={500}
      height={500}
      alt="Picture of the author"
      />
      </div> */}
          <ToastContainer/>
        {sentCode ? (
          <section className="pt-20  bg-gray-900 text-end ">
            <div className=" flex direction-r flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
              <div className="w-full  rounded-lg shadow  border md:mt-0 2sm:w-[90%] max-w-md xl:p-0  bg-gray-700  border-gray-700 absolute top-[40%] z-20">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8  bg-gray-800">
                  <h1 className="text-xl font-bold leading-tight tracking-tightmd:text-2xl  text-white">
                    ادخل الكود
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <input
                        onChange={(e) => setValueCode(e.target.value)}
                        type="number"
                        name="number"
                        id="number"
                        className=" border direction-l  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  bg-gray-700  border-gray-600  placeholder-gray-400  text-white  "
                        placeholder="695318"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={handelSubmitCode}
                      className="w-full text-white bg-blue-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  0  "
                    >
                      ارسل الكود
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className=" w-[70%] top-[25%] pt-20 bg-gray-900 text-end left-[15%] absolute 2sm:top-[18%] 2sm:left-5 z-20 2sm:w-[90%]">
            <div className="flex direction-r flex-col items-center justify-center px-6 py-8 mx-auto md:h-1/2 lg:py-0">
              <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                    تسجيل الدخول
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="number"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        ادخل هاتفك
                      </label>
                      <input
                        type="number"
                        name="number"
                        id="number"
                        className="border sm:text-sm rounded-lg direction-l  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0123456789"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={handleSentCode}
                      className="w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover-bg-primary-700 focus-ring-primary-800"
                    >
                      ارسل رقم التحقيق
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
};

export default page;
