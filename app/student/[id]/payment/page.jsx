"use client"
import {useEffect, useState} from 'react'
import InputAddClass from '../../../ui/addClass/InputAddClass';
import Spinners from '../../../ui/Spinners'
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {sendToast} from "../../../func/toast";

const page = (props) => {
    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [showInputPayment, setShowInputPayment] = useState ( false );
    const [paymentAmount, setPaymentAmount] = useState ( 0 );
    const [payments, setPayments] = useState ( [] );
    const [sellected, setSellected] = useState ( 1 );
    const [notFound, setNotFound] = useState ( false );
    const toggleInputPayment = () => {
        setShowInputPayment ( !showInputPayment );
    };
    const [student, setStudent] = useState ( {payments: []} );
    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        const fetchData = async () => {
            try {
                var response = await axios.get ( `/api/Teacher/student/payment/${props.params.id}?limit=${limit}&page=${page}` );
                console.log ( response.data );
                setStudent ( response.data.student );
                setPaymentAmount ( response.data.student.paymentAmount )
                setPayments ( response.data.payments )
                setNotFound ( false )
            } catch (error) {
                if (error.response.status == 404) {
                    setNotFound ( true )
                } else sendToast ( "حدث خطأ ما", "error" );
                console.error ( error );
            }
        }
        fetchData ();
    }, [Roles] );

    const Arabicmonths = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ];
    const monthsString = [];
    const months = [];
    const limit = 10;
    const [page, setPage] = useState ( 1 );

    const generateMonthList = () => {
        let currentDate = new Date ();

        monthsString.push ( `${Arabicmonths[currentDate.getMonth ()]}/${currentDate.getFullYear ()}` );
        months.push ( currentDate )
        const previousMonth = new Date ( currentDate );
        previousMonth.setMonth ( currentDate.getMonth () - 1 );
        monthsString.unshift ( `${Arabicmonths[previousMonth.getMonth ()]}/${previousMonth.getFullYear ()}` );
        months.unshift ( previousMonth )
        for (let i = 1; i <= 6; i ++) {
            const nextMonth = new Date ( currentDate );
            nextMonth.setMonth ( currentDate.getMonth () + i );
            const formattedMonth = `${Arabicmonths[nextMonth.getMonth ()]}/${nextMonth.getFullYear ()}`;
            monthsString.push ( formattedMonth );
            months.push ( nextMonth )
        }
        return monthsString;
    };
    const nextMonths = generateMonthList ();

    function convertToReadableDateTime (dateTimeString) {
        // Create a Date object with the given date/time string
        const dateObj = new Date ( dateTimeString );

        // Check if the date is valid
        if (isNaN ( dateObj.getTime () )) {
            return "Invalid Date";
        }

        // Format the date to a readable date and time format
        const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        const readableDateTime = dateObj.toLocaleString ( undefined, options );

        return readableDateTime;
    }

    function handleMonthChange (e) {
        setSellected ( e )

    }

    function addPayment () {
        let date = months[sellected];
        let month = date.getMonth () + 1;
        let year = date.getFullYear ();
        month = month > 9 ? month : `0${month}`;
        date = `${year}-${month}-01`
        const data = {
            studentId: props.params.id,
            amount: paymentAmount,
            date: date
        }
        axios.post ( `/api/Teacher/payment`, data ).then ( (response) => {
            console.log ( response.data );
            sendToast ( "تم اضافة الدفعة بنجاح", "success" );
            setNotFound(false);
            setPayments ( [...payments, response.data.data] )
        } ).catch ( (error) => {
            if (error.response.status == 404) {
                sendToast ( "الطالب غير موجود", "error" )
            }
            if (error.response.status == 400) {
                if (error.data.messages[0].statusCode == 301) {
                    sendToast ( "لقد تم اضافة دفعة لهذا الطالب بالفعل", "warning" );
                } else sendToast ( "حدث خطأ ما", "error" );
            }else sendToast ( "حدث خطأ ما", "error" );
        } )
    }

    if (HaveRole ( [null] )) return <Spinners/>;
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20 px-4">
                <div className='text-end'>
                    <ToastContainer/>
                    <button onClick={toggleInputPayment} type="button"
                            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        اضافة دفع
                    </button>
                </div>
                {showInputPayment && (


                    <div className="mb-6 img_liner_2 p-4 rounded-lg">
                        <select value={sellected} onChange={(e) => handleMonthChange ( e.target.value )} id="countries"
                                className="text-end bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {nextMonths.map ( (nextMonth, index) => (
                                <option key={index} value={index}>
                                    {nextMonth}
                                </option>
                            ) )}
                        </select>
                        <div className="direction_rtl">
                            <InputAddClass lable="المبلغ"/>
                        </div>
                        <div className="text-center mt-6">
                            <button onClick={addPayment} type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
                                ارسال
                            </button>
                        </div>
                    </div>

                )}
                <div className="tabel-payment">
                    <div className="relative overflow-x-auto rounded-md">
                        {notFound ? <div className="text-center mt-10 text-3xl text-color-text">لا يوجد مصاريف</div> :
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        الشهر
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        يوم الدفع
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        الحالة
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        المستلم
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        السعر
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        تحديث بواسطه
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {payments.map ( (payment, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{payment.billDate}</td>
                                        <td className="px-6 py-4">{convertToReadableDateTime ( payment.createdAt )}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className=" bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                                                color="green">
                                                مدفوع
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">{payment.createdBy}</td>
                                        <td className="px-6 py-4">{payment.amount}</td>
                                        <td className="px-6 py-4">{payment.updateBy ? payment.updateBy : "لم يحدث"}</td>
                                    </tr>
                                ) )}
                                </tbody>


                            </table>
                        }
                    </div>
                </div>


            </div>
        )
    }
    else {
        router.push ( "/login" );
    }
}
export default page