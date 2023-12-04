"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../config/axiosconfigClient";
import { useAuth } from "../../AppState";
import { useRouter } from "next/navigation";
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
    if (!HaveRole(["UnAuthorized", "HaveAdminCode"])) {
      router.push("/");
    }
    if (HaveRole(["HaveAdminCode"])) setCodeCode(true);
  }, [Roles]);
  const handelSubmitCode = async (e) => {
    e.preventDefault();
    var body = valueCode;
    try {
      var response = await axios.post(
        "/api/Auth/teacher/verify",
        JSON.stringify(body),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.setItem("token", response.data.data.token);
      document.cookie = `token=${response.data.data.token}`;
      window.location.href = "/";
    } catch (e) {}
  };

  const handleSentCode = async (e) => {
    e.preventDefault();
    if (isEgyptianNumber(phoneNumber)) {
      var body = phoneNumber;
      try {
        var response = await axios.post(
          "/api/Auth/teacher/login",
          JSON.stringify(body)
        );
        localStorage.setItem("token", response.data.data.token);
        document.cookie = `token=${response.data.data.token}`;

        setCodeCode(true);
      } catch (e) {}
    } else {
      toast.error("الرقم المدخل غير صحيح. يجب أن يكون بصيغة مصرية صحيحة.");
    }
  };
  if (HaveRole([null])) {
    return <>loddddding</>;
  }
  if (HaveRole(["UnAuthorized", "HaveAdminCode"])) {
    return (
      <>
        {sentCode ? (
          <section className="  bg-gray-900">
            <div className="flex direction-r flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full  rounded-lg shadow  border md:mt-0 sm:max-w-md xl:p-0  bg-gray-800  border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
          <section className="bg-gray-900">
            <div className="flex direction-r flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                      className="w-full text-white  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover-bg-primary-700 focus-ring-primary-800"
                    >
                      ارسل رقم التحقيق
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    );
  }
};

export default page;
