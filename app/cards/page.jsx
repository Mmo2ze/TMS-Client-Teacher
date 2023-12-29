"use client"
import {useState , useEffect} from 'react'
import axios from "../config/axiosconfigClient"
import Spinners from '@/app/ui/Spinners';
import jsPDF from "jspdf";
import { font } from "../func/IBMPlexSansArabic-Medium-bold";
import QRious from 'qrious';
import Front4 from "../../public/Front4.png";
import Image from 'next/image'

const page = () => {
  const [classes, setClasses] = useState([""]);
  const [students, setStudents] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenStudent, setIsDropdownOpenStudent] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [students2, setStudents2] = useState([]);
  const [classIds, setClassIds] = useState([]);




  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("/api/Teacher/class");
        setClasses(response.data);
        setIsLoading(false);

      } catch (e) {
        console.log(e);
      }
    };
  
    getdata(); 
  }, []);



  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const fetchData = async () => {
        try {
          const url = searchWord ? `/api/Teacher/student/search/${searchWord}` : '/api/Teacher/student';
          const response = await axios.get(url);
          setStudents(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [searchWord]);


  const handleDropdownOpen = () => {
    if (isDropdownOpenStudent) {
      setIsDropdownOpenStudent(false);
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownOpenStudent = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
    setIsDropdownOpenStudent(!isDropdownOpenStudent);
  };

  const padding = { top: 3, right: 5, bottom: 45, left: 0 };
  const generateNewPrintPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const imageWidth = 95;
    const imageHeight = 50;
    const imagesPerRow = 2;
    const rowsPerPage = 5;
    const spaceBetweenImages = 10;
    const totalPages = Math.ceil(students.concat(students2).length / (imagesPerRow * rowsPerPage));
    const nameOffsetX = 7;
    const nameOffsetY = -40;

    for (let page = 0; page < totalPages; page++) {
      pdf.addFileToVFS("IBMPlexSansArabic-Medium-bold.ttf", font);
      pdf.addFont("IBMPlexSansArabic-Medium-bold.ttf", "IBMPlexSansArabic-Medium", "bold");
      pdf.setFont("IBMPlexSansArabic-Medium", "bold");
      pdf.setDrawColor(0);
      pdf.setFillColor(255, 255, 255);
      pdf.setTextColor(255, 255, 255);
      pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), "F");
      for (let row = 0; row < rowsPerPage; row++) {
        for (let col = 0; col < imagesPerRow; col++) {
          const studentIndex = page * rowsPerPage * imagesPerRow + row * imagesPerRow + col;
          if (studentIndex < students.concat(students2).length) {
            const student = students.concat(students2)[studentIndex];
            const xPos = padding.right + col * (imageWidth + spaceBetweenImages);
            const yPos = padding.top + row * (imageHeight + spaceBetweenImages);
            const nameXPos = xPos + nameOffsetX;
            const nameYPos = yPos + imageHeight + nameOffsetY;
            const qrCodeValue = (student && student.id) ? student.id.toString() : "";
            const qr = new QRious({
              value: qrCodeValue,
              background: '#dfdedc',
              size: 50,
            });

            pdf.addImage("/Front4.png", "PNG", xPos, yPos, imageWidth, imageHeight);
            const qrCodeXPos = xPos + imageWidth / 2;
            const qrCodeYPos = yPos + imageHeight / 2;
            // pdf.text(student.name, nameXPos, nameYPos);
            // pdf.text(student.id.toString(), nameXPos + 10, nameYPos + 15);
            pdf.addImage(qr.toDataURL(), "PNG", qrCodeXPos + 14, qrCodeYPos - 19, 33, 33);
          }
        }
      }

      if (page !== totalPages - 1) {
        pdf.addPage();
      }
    }

    pdf.save(`${students.concat(students2).length}Student.pdf`);
  };

  const handleChange = (event) => {
    const selectedClassId = event.target.value;
    var index = classIds.indexOf(Number(selectedClassId));
    if (index !== -1) {
      classIds.splice(index, 1);
    } else classIds.push(Number(selectedClassId));
    request("api/Class/id", "patch", classIds)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
        sendToast("some thing went wrong", "error");
      });
  };


  return (
    <div className="pt-20 px-4 text-end ">

      <div className="flex justify-between gap-6 ">
          <div className="flex-1"> 
      <div className='relative'>

      <button
              id="dropdownBgHoverButton"
              data-dropdown-toggle="dropdownBgHover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleDropdownOpenStudent}
            >
 اختيار طالب
<svg
className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
  isDropdownOpenStudent ? "rotate-180" : ""
}`}
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 10 6"
>
<path
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="m1 1 4 4 4-4"
/>
</svg>
</button>
  <div
id="dropdownBgHover"
className={`z-10 ${
  isDropdownOpenStudent ? "block" : "hidden"
} w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-14 2sm:right-[-20px] right-0 `}
>          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
<li>
<div>
            <input
              type="search"
              id="default-search"
              autoComplete="off"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="block text-end w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="البحث عن طالب"
              required
            />
          </div>
      </li>
      {students.map((student) => (
        <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-4" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{student.student && student.student.name}</label>
        </div>
      </li>
        ))}

    </ul>
  </div>
</div>

        </div>
      <div className="flex-1"> 
      <div className='relative'>

      <button
              id="dropdownBgHoverButton"
              data-dropdown-toggle="dropdownBgHover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleDropdownOpen}
            >
 اختيار صف
<svg
className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
isDropdownOpen ? "rotate-180" : ""
}`}
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 10 6"
>
<path
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="m1 1 4 4 4-4"
/>
</svg>
</button>
<div
id="dropdownBgHover"
className={`z-10 ${
isDropdownOpen ? "block" : "hidden"
} w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-14 right-0`}
>         
 <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
  {classes.map((cl)=>( 

      <li onChange={handleChange}>
        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input id="checkbox-item-4" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          <label htmlFor="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">  {cl.name}  </label>
        </div>
      </li>
  ))}

    </ul>
  </div>
</div>

        </div>

      </div>
      <div className="flex justify-center my-12"> 
      <button onClick={generateNewPrintPDF} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        طباعة الكروت
      </button>

      </div>

    </div>
  )
}

export default page