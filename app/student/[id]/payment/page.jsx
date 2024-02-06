"use client"
import {useEffect, useState} from 'react'
import InputAddClass from '../../../ui/addClass/InputAddClass';
import Spinners from '../../../ui/Spinners'
import {useRouter} from "next/navigation";
import {useAuth} from "/AppState";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {sendToast, loadingToast, endLodingToast} from "../../../func/toast";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopDeletePayment from './../../../ui/student/PopDeletePayment';
import CloseIcon from '@mui/icons-material/Close';

const page = (props) => {
    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [showInputPayment, setShowInputPayment] = useState ( false );
    const [paymentAmount, setPaymentAmount] = useState ( 0 );
    const [payments, setPayments] = useState ( [] );
    const [sellected, setSellected] = useState ( 1 );
    const [notFound, setNotFound] = useState ( false );
    const [ShowUpdatePopup, setShowUpdatePopup] = useState ( false );
    const [updatePaymentId, setUpdatePaymentId] = useState ( 0 );
    const [paymentBillDate, setPaymentBillDate] = useState ( "" );
    const [showPopDelete, setShowPopDelete] = useState ( false );
    const [paymentId, setPaymentId] = useState ( "" )
    const toggleInputPayment = () => {
        setShowInputPayment ( !showInputPayment );
    };
    const [student, setStudent] = useState ( {payments: []} );
    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        const fetchData = async () => {
            try {
                var response = await axios.get ( `/api/v1/Teacher/student/payment/${props.params.id}?limit=${limit}&page=${page}` );
                console.log ( response.data );
                setStudent ( response.data.student );
                setPaymentAmount ( response.data.student.paymentAmount )
                console.log ( "the payment amount is ", response.data.student.paymentAmount )
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

    const Arabicmonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
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
        console.log ( typeof (e) )
        setSellected ( e )
    }

    function addPayment () {
        let date = months[sellected];
        let month = date.getMonth () + 1;
        let year = date.getFullYear ();
        month = month > 9 ? month : `0${month}`;
        date = `${year}-${month}-01`
        const data = {
            studentId: props.params.id, amount: paymentAmount, date: date
        }
        axios.post ( `/api/v1/Teacher/payment`, data ).then ( (response) => {
            console.log ( response.data );
            sendToast ( "تم اضافة الدفعة بنجاح", "success" );
            setNotFound ( false );
            setPayments ( [...payments, response.data.data] )
            setShowInputPayment ( !showInputPayment );
        } ).catch ( (error) => {
            if (error.response.status == 404) {

                sendToast ( "الطالب غير موجود", "error" )
            }
            if (error.response.status == 400) {
                console.log ( "تم الدفع من قبل" )
                if (error.response.data.messages[0].statusCode == 301) {
                    sendToast ( "تم دفع هذا الشهر من قبل ", "warning" );
                } else sendToast ( "حدث خطأ ما", "error" );
            } else sendToast ( "حدث خطأ ما", "error" );
        } )
    }

    function deletePayment (payment) {
        setShowPopDelete ( !showPopDelete )
        setPaymentId ( payment.id )

    }

    const findIndexByDate = (dateString) => {
        const [year, month] = dateString.split ( '-' );

        for (let i = 0; i < months.length; i ++) {
            if (month == months[i].getMonth () && year == months[i].getFullYear ()) {
                return i;
            }
        }

        // Return -1 if the date is not found
        return - 1;
    };

    function showUpdatePayment (payment) {


// Example usage:
        var dateToFind = payment.billDate;
        const index = findIndexByDate ( dateToFind );
        console.log ( index )
        setShowUpdatePopup ( !ShowUpdatePopup );
        setUpdatePaymentId ( payment.id );
        setPaymentAmount ( payment.amount );
        setPaymentBillDate ( payment.billDate );

    }

    function updatePayment () {
        // console.log(sellected)
        // let date = months[sellected];
        // let month = date.getMonth () + 1;
        // let year = date.getFullYear ();
        // month = month > 9 ? month : `0${month}`;
        // date = `${year}-${month}-01`
        const data = {
            amount: paymentAmount, billDate: paymentBillDate
        }
        axios.put ( `/api/v1/Teacher/payment/${updatePaymentId}`, data ).then ( (response) => {
            console.log ( response.data );
            sendToast ( "تم تحديث الدفعة بنجاح", "success" );
            setNotFound ( false );
            setPayments ( (prevArray) => prevArray.map ( (obj) => {
                if (obj.id === updatePaymentId) {
                    return {
                        ...obj, amount: paymentAmount, billDate: paymentBillDate
                    };
                }
                return obj;
            } ) );
            setShowUpdatePopup ( false );
        } ).catch ( (error) => {
            if (error.response.status == 404) {

                sendToast ( "الطالب غير موجود", "error" )
            }
            if (error.response.status == 400) {
                console.log ( "تم الدفع من قبل" )
                if (error.response.data.messages[0].statusCode == 301) {
                    sendToast ( "تم دفع هذا الشهر من قبل ", "warning" );
                } else if (error.response.data.messages[0].statusCode == 306) sendToast ( "لا يمكنك تحديث دفعه مساعد اخر ", "warning" ); else sendToast ( "حدث خطأ ما", "error" );
            } else sendToast ( "حدث خطأ ما", "error" );
        } )
    }

    if (HaveRole ( [null] )) return <Spinners/>; else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (<div className="pt-20 px-4 relative">
            {showPopDelete && (
                <div className="overlay">\
                    <PopDeletePayment text="هل انت متأكد من حذف هذا الدفع للطالب "
                                      conferm="بعد تأكيد الحذف سيتم حذف  الدفع للشهر المحدد"
                                      setPayments={setPayments}
                                      id={paymentId} axios={axios}
                                      onCansle={() => setShowPopDelete ( !showPopDelete )}/>
                </div>)}
            <div className='text-end'>
                <ToastContainer/>
                <button onClick={toggleInputPayment} type="button"
                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    اضافة دفع
                </button>
            </div>
            {showInputPayment && (<div className="mb-6 img_liner_2 p-4 rounded-lg">
                    <select defaultValue={sellected} onChange={(e) => handleMonthChange ( e.target.value )}
                            id="countries"
                            className="text-end bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {nextMonths.map ( (nextMonth, index) => (<option key={index} value={index}>
                            {nextMonth}
                        </option>) )}
                    </select>
                    <div className="direction_rtl">
                        <InputAddClass onChange={setPaymentAmount} value={paymentAmount} lable="المبلغ"/>
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
                    {payments.length === 0 ?
                        <div className="text-center mt-10 text-3xl text-color-text">لا يوجد مصاريف</div> :
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
                                {HaveRole ( ["Teacher", "AddPayment"] ) && (<div>
                                    <th scope="col" className="px-6 py-3">
                                        حذف
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        تعديل
                                    </th>
                                </div>)}
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
                                    {HaveRole ( ["Teacher", "AddPayment"] ) && (<div>

                                        <td className="px-6 py-4 text-color-red cursor-pointer">
                                            <DeleteIcon onClick={() => deletePayment ( payment )}/>
                                        </td>
                                        <td className="px-6 py-4 text-color-aqua cursor-pointer">
                                            <EditIcon onClick={() => showUpdatePayment ( payment )}/>
                                        </td>
                                    </div>)}
                                </tr>) )}
                            </tbody>
                        </table>}
                </div>
            </div>
            {ShowUpdatePopup && (<div className="mb-6 img_liner_2 p-4 rounded-lg fixed w-[90%] top-[23%] left-[5%]">
                {/*<select  onChange={(e) => handleMonthChange ( e.target.value )}*/}
                {/*        id="countries2"*/}
                {/*        className="text-end bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">*/}
                {/*    {nextMonths.map ( (nextMonth, index) => (*/}
                {/*        <option key={index} value={index}>*/}
                {/*            {nextMonth}*/}
                {/*        </option>*/}
                {/*    ) )}*/}
                {/*</select>*/}
                <div className="absolute top-3 cursor-pointer" onClick={() => setShowUpdatePopup ( false )}>
                    <CloseIcon color="primary" sx={{fontSize: 50}}/></div>
                <div className="direction_rtl mb-6 pr-2">
                    <InputAddClass onChange={setPaymentAmount} value={paymentAmount} lable="المبلغ"/>
                </div>
                <div className="text-center mt-6 ">
                    <button onClick={updatePayment} type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
                        تحديث
                    </button>
                </div>
            </div>)}
        </div>)
    } else {
        router.push ( "/login" );
    }
}
export default page