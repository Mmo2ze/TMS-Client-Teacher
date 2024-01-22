import { useEffect, useState } from "react";
import "./AllPayments.css";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ar from "date-fns/locale/ar";
import { FaCalendar } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import Link from 'next/link';

registerLocale("ar", ar);

setDefaultLocale("ar");

function PaymentTable({axios}) {
    const [totalAmount, setTotalAmount] = useState(0);
    const [Payments, setPayments] = useState([]);
    const [isInputVisible, setInputVisible] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const toggleInputVisibility = () => {
        setInputVisible(!isInputVisible);
    };
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);

    useEffect(() => {
        console.log(":"+dateRange[0].startDate)

        const startDateString = dateRange[0].startDate.toDateString();
        const endDateString = dateRange[0].endDate.toDateString();
        axios.get(
            `api/Teacher/payments?start=${startDateString}&end=${endDateString}`
        ).then((res) => {
            setPayments(res.data.data);
            const total = res.data.data.reduce((acc, payment) => {
                return acc + payment.amount;
            },0);
            setTotalAmount(total);
        });
    }, [dateRange]);

    function convertDateTimeToString(dateString) {
        const dateTimeString = dateString;
        const jsDate = new Date(dateTimeString);
        return jsDate.toDateString();
    }

    const adminSubtotals = {};

    Payments.forEach((payment) => {
        const adminId = payment.createdBy.id || 0;
        const amount = payment.amount;

        if (!adminSubtotals[adminId]) {
            adminSubtotals[adminId] = {
                adminId,
                adminName: payment.createdBy.name,
                subtotal: amount,
            };
        } else {
            adminSubtotals[adminId].subtotal += amount;
        }
    });

    const resultArray = Object.values(adminSubtotals);


    return (
        <>
            <div>
        <span onClick={toggleInputVisibility} className="icon_date">
          <CalendarMonthIcon sx={{ fontSize: 50 }} color="primary" />
        </span>

                <div className="the_div-in_date">
                    {isInputVisible && (
                        <div className="pop_date">
                            <CloseIcon
                                onClick={toggleInputVisibility}
                                className="close-button"
                            />
                            <DateRange
                                ranges={dateRange}
                                onChange={(ranges) => {
                                    setDateRange([ranges.selection]);
                                    setIsDateRangeSelected(true);
                                }}
                                locale={ar}
                                calendarIcon={<FaCalendar />}
                            />
                        </div>
                    )}
                </div>
            </div>
            <h2 className="olvs_amount">المبلغ الكلي: {totalAmount}</h2>
            {  (
                <div className="table-in_owner mb-10 relative overflow-x-auto table-container rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                اسم المستلم
                            </th>
                            <th scope="col" className="px-6 py-3">
                                المبلغ
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultArray.map((subtotal, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {subtotal.adminName}
                                </td>
                                <td className="px-6 py-4">{subtotal.subtotal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="table-payment_student relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            الشهر
                        </th>
                        <th scope="col" className="px-6 py-3">
                            تاريخ الدفع
                        </th>
                        <th scope="col" className="px-6 py-3">
                            الحالة
                        </th>
                        <th scope="col" className="px-6 py-3">
                            المساعد
                        </th>
                        <th scope="col" className="px-6 py-3">
                            الطالب
                        </th>
                        <th scope="col" className="px-6 py-3">
                            السعر
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {Payments.map((payment, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-6 py-4" data-label="الشهر">
                                {payment.billDate}
                            </td>
                            <td className="px-6 py-4" data-label="تاريخ الدفع">
                                {convertDateTimeToString(payment.createdAt)}
                            </td>
                            <td className="px-6 py-4" data-label="الحالة">
                                <button
                                    className=" bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                                    color="green"
                                >
                                    مدفوع
                                </button>
                            </td>
                            <td className="px-6 py-4" data-label="المساعد">
                                {payment.createdBy.name}
                            </td>
                            <Link href={`/student/${payment.studentId}`}>
                                <td
                                    className="px-6 py-4 edit_name-students"
                                    data-label="الطالب"
                                >
                                    {payment.studentName}
                                </td>
                            </Link>

                            <td className="last_name_student px-6 py-4" data-label="السعر">
                                {payment.amount}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PaymentTable;
