"use client"
import {useState, useEffect} from 'react'
import img1 from "../../../public/mother.png";
import img2 from "../../../public/man.jpg";
import Image from "next/image";
import Button from "../../ui/Button";
import Spinners from '../../ui/Spinners';
import InputDetailsStudent from "../../ui/student/InputDetailsStudent";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAuth} from "/AppState";
import {endLodingToast, loadingToast, sendToast} from "../../func/toast";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const page = (props) => {
    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [data, setData] = useState ( [] );
    const [dataClasses, setDataClasses] = useState ( [] );
    const [isLoading, setIsLoading] = useState ( true );
    const [studentId, setStudentId] = useState ( "" )
    const [studentName, setStudentName] = useState ( "" )
    const [studentGrade, setStudentGrade] = useState ( "" )
    const [studentClass, setStudentClass] = useState ( "" )
    const [studentPhone, setStudentPhone] = useState ( "" )
    const [studentGender, setStudentGender] = useState ( "" )
    const [parentPhone, setParentPhone] = useState ( "" )
    const [paymentDaly, setPaymentDaly] = useState ( "" )
    const [paymentAmount, setPaymentAmount] = useState ( "" )
    const [selectedClassId, setSelectedClassId] = useState ( 0 );
    const [isPayed, setIsPayed] = useState ( false )
    const [disabeld, setDisabeld] = useState ( true )
    useEffect ( () => {
        const getdata = async () => {
            if (HaveRole ( [null] )) return;
            try {
                const response = await axios.get ( `/api/v1/Teacher/student/${props.params.id}` );
                setData ( response.data.data );
                setIsLoading ( false );
                // console.log(`sadasdas${response.data.data.privateId}`)
                setStudentName ( response.data.student.student.name )
                setStudentClass ( response.data.student.className )
                setStudentGrade ( response.data.student.grade )
                setStudentPhone ( response.data.student.student.phone )
                setStudentGender ( response.data.student.student.gender )
                setStudentId ( response.data.student.privateId );
                setParentPhone ( response.data.parent.phone )
                setPaymentDaly ( response.data.student.paymentDelay )
                setPaymentAmount ( response.data.student.paymentAmount )
                setSelectedClassId ( response.data.student.classId )
                setIsPayed( response.data.isPayed)
            } catch (e) {
                console.log ( e );
            }
        };

        getdata ();
    }, [Roles] );


    const putData = async () => {
            const toast = loadingToast();
        try {
            const response = await axios.put ( `api/v1/Teacher/student/${studentId}`, {
                studentPhone: studentPhone,
                parentPhone: parentPhone,
                classId: selectedClassId,
                gender: studentGender,
                status: "Active",
                paymentPrice: paymentAmount,
            } );
            setStudentName ( response.data.student.student.name )
            setStudentClass ( response.data.student.className )
            setStudentGrade ( response.data.student.grade )
            setStudentPhone ( response.data.student.student.phone )
            setStudentGender ( response.data.student.student.gender )
            setStudentId ( response.data.student.privateId );
            setParentPhone ( response.data.parent.phone )
            setPaymentDaly ( response.data.student.paymentDelay )
            setPaymentAmount ( response.data.student.paymentAmount )
            setSelectedClassId ( response.data.student.classId )
            setDisabeld(true)
            endLodingToast(toast,"تم التعديل بنجاح","success");

        } catch (e) {
            if(e.response.data.messages){
                const messageCode = e.response.data.messages[0].statusCode;
                    switch (messageCode){
                        case 301:
                            endLodingToast(toast,"يرجي ادخال رقم طالب صحيح","error");
                        break;
                        case 302:
                            endLodingToast(toast,"يوجد طالب اخر بهذا الرقم","error");
                            break
                        case 303:
                            endLodingToast(toast,"يرجي ادخال رقم ولي امر صحيح","error");
                            break
                        case 404 :
                            endLodingToast(toast,"الصف غير موجود او الطالب","error");
                            break
                        default:
                            endLodingToast(toast,"حدث خطأ ما","error");
                }
            }else endLodingToast(toast,"حدث خطأ ما","error")
        }
    }


    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        const getdataClasses = async () => {
            try {
                const response = await axios.get ( "/api/v1/Teacher/class" );
                setDataClasses ( response.data );
            } catch (e) {
                console.log ( e );
            }
        };
        getdataClasses ();
    }, [Roles] );


    if (HaveRole ( [null] )) return <Spinners/>;
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20 px-3">
            <ToastContainer/>
                <div className="img_liner p-4 rounded-lg flex flex-col gap-5">
                    <div className="flex justify-between items-center mb-1">
                        <Image
                            className="rounded-[50%]"
                            src={studentGender === "Male" ? img2 : img1}
                            width={65}
                            height={65}
                            alt="Picture of the author"
                        />
                        <div>
                            <h1 className="text-xl mb-2 text-side12-color md:text-3xl">
                                {studentName}
                            </h1>
                            <p className="text-end text-side13-color md:text-xl mb-2">

                                {studentGrade === "FirstSecondary" && "أولى ثانوي"}
                                {studentGrade === "SecondSecondary" && "ثاني ثانوي"}
                                {studentGrade === "ThirdSecondary" && "ثالث ثانوي"}

                            </p>
                            <p className="text-end text-side13-color md:text-xl">
                                {studentClass}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        {/*<Link to="route" target="_blank" rel="noopener noreferrer" />*/}

                        <Link href={`https://wa.me/+2${parentPhone}`} target="_blank" rel="noopener noreferrer">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                <WhatsAppIcon/>
                            </button>
                        </Link>

                        <button
                            className={
                                isPayed
                                    ? "paym-details_student bg-green-100 text-green-800 text-lg font-medium mr-2 w-[80px]  h-[45px] p-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                                    : "paym-details_student bg-red-100 text-red-800 text-lg font-medium mr-2 w-[90px]  h-[45px] p-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                            }
                        >
                            {true ? "مدفوع" : "غير مدفوع"}
                        </button>

                        <Link href={`tel:${parentPhone}`} target="_blank" rel="noopener noreferrer">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                <PhoneIcon/>
                            </button>
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <div className='flex flex-col gap-6'>
                            <Link href={`/student/${props.params.id}/payment`}>

                                <button
                                    type="button"
                                    className="text-white  flex bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium w-fit  rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 m-auto"
                                >
                                    المصاريف
                                </button>
                            </Link>
                            <Link href={`/student/${props.params.id}/quiz`}>

                                <button
                                    type="button"
                                    className="text-white  flex bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium w-fit  rounded-lg text-base px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 m-auto"
                                >
                                    الامتحانات
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="img_liner_2 mt-4 p-2 rounded-lg">
                    {/*
            <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col">
              <InputStudent lable="ID" placeholder={studentId}/>
              <InputStudent lable="الاسم" placeholder={studentName}/>
            </div> */}

                    {/* <InputStudent lable="الصف" placeholder={studentGrade}/> */}
                    <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col direction_rtl">
                        <InputDetailsStudent type="number" lable="الرقم" value={studentPhone} onChange={setStudentPhone}
                                             enable={disabeld}/>
                        <InputDetailsStudent type="number" lable="رقم ولي الامر" value={parentPhone}
                                             onChange={setParentPhone} enable={disabeld}/>
                    </div>

                    <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col direction_rtl items-center">
                        {/* <InputDetailsStudent lable="الشعبة" value={studentClass} onChange={setStudentClass}  enable={enable}/> */}
                        <div className='w-full mt-[50px] 2sm:mt-[20px]'>

                            <select
                                disabled={disabeld}
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedClassId}
                                onChange={(e) => setSelectedClassId ( e.target.value )}
                            >
                                {dataClasses.map ( (cl) => (
                                    <option key={cl.id} value={cl.id}>
                                        {cl.name}
                                    </option>
                                ) )}
                            </select>
                        </div>
                        <InputDetailsStudent type="number" lable="المبلغ" value={paymentAmount}
                                             onChange={setPaymentAmount} enable={disabeld}/>
                    </div>

                    <div className="flex w-full gap-3 text-center mb-8 2sm:flex-col items-center direction_rtl">

                        <InputDetailsStudent type="number" lable="مدة التأخير" value={paymentDaly}
                                             onChange={setPaymentDaly} enable={disabeld}/>


                    </div>
                    <div className="flex flex-1 justify-around mb-6">
                        <div className="flex items-center  flex-col-reverse mb-4">
                            <input
                                id="male-radio"
                                type="radio"
                                name="gender-radio"
                                className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={studentGender === 'Male'}
                                onChange={() => setStudentGender ( 'Male' )}
                                disabled={disabeld}
                            />
                            <label htmlFor="male-radio"
                                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                ذكر
                            </label>
                        </div>
                        <div className="flex items-center flex-col-reverse mb-4">
                            <input
                                id="female-radio"
                                type="radio"
                                name="gender-radio"
                                className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={studentGender === 'Female'}
                                onChange={() => setStudentGender ( 'Female' )}
                                disabled={disabeld}
                            />
                            <label htmlFor="female-radio"
                                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                أنثى
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-around gap-6">

                        {disabeld?
                        <button onClick={() => setDisabeld ( false )} type="button"
                                className=" w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            تعديل
                        </button>:
                        <button onClick={() => putData ()} type="button"
                                className="focus:outline-none w-1/2  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            حفظ
                        </button>
                        }

                    </div>
                </div>
            </div>
        );
    } else {
        router.push ( "/login" );
    }
}

export default page;
