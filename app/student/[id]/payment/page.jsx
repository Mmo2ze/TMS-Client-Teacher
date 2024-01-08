"use client"
import {useState} from 'react'
import InputStudent from '@/app/ui/InputStudent';
import Button from '@/app/ui/Button';

const page = () => {
  const [showInputPayment, setShowInputPayment] = useState(false);
  const toggleInputPayment = () => {
    setShowInputPayment(!showInputPayment);
  };
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

  const generateMonthList = () => {
    let currentDate = new Date();

    monthsString.push(`${Arabicmonths[currentDate.getMonth()]}/${currentDate.getFullYear()}`);
    months.push(currentDate)
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(currentDate.getMonth() - 1);
    monthsString.unshift(`${Arabicmonths[previousMonth.getMonth()]}/${previousMonth.getFullYear()}`);
    months.unshift(previousMonth)
    for (let i = 1; i <= 6; i++) {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(currentDate.getMonth() + i);
      const formattedMonth = `${Arabicmonths[nextMonth.getMonth()]}/${nextMonth.getFullYear()}`;
      monthsString.push(formattedMonth);
      months.push(nextMonth)
    }
    return monthsString;
  };

  const nextMonths = generateMonthList();


  return (
    <div className="pt-20 px-4">
        <div className='text-end'>
          <button onClick={toggleInputPayment} type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          اضافة دفع
            </button>
        </div>
        {showInputPayment && (

          
            <div className="mb-6 img_liner_2 p-4 rounded-lg">
                  <select   id="countries" className="text-end bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {nextMonths.map((nextMonth, index) => (
                      <option key={index} value={index} >
                        {nextMonth}
                      </option>
                    ))}
                  </select>
                  <InputStudent lable="المبلغ" placeholder="200$"/>
                      <div className="text-center mt-6"> 
                      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
                        ارسال
                        </button>
                      </div>
                </div>

                )}

    </div>
  )
}

export default page