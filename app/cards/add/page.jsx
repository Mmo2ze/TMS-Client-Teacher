"use client"
import {useState, useEffect} from 'react'
import axios from "../../config/axiosconfigClient"
import DeleteIcon from '@mui/icons-material/Delete';
import {sendToast} from "@/app/func/toast";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
    const [isDropdownOpenStudent, setIsDropdownOpenStudent] = useState (false);
    const [isDropdownOpen, setIsDropdownOpen] = useState (false);
    const [classes, setClasses] = useState ([]);
    const [data, setData] = useState ([]);
    const [searchWord, setSearchWord] = useState ('');
    const [selectedClasses, setSelectedClasses] = useState([]); 
    const [studentClass , setStudentClass] = useState([])
    
    useEffect (() => {
        const getdata = async () => {
            try {
                const response = await axios.get ("/api/Teacher/class");
                setClasses (response.data);
            } catch (e) {
                console.log (e);
            }
        };

        getdata ();
    }, []);

    console.log(`the studentClass is ${studentClass}`)


function removeStudent (selectedStudent) {
    setStudentClass(prevStudentClass => prevStudentClass.filter(st => st.privateId !== selectedStudent.privateId));

}
    function isStudentAlreadyAdded (selectedStudent) {

     return    studentClass.some ( st => st.privateId === selectedStudent.privateId );
    }
     const handelstudent = (selectedStudent) => {
        // تحقق مما إذا كان هذا الطالب موجودًا بالفعل في الجدول

      // إذا لم يكن موجودًا، قم بإضافته إلى الجدول
      if (!isStudentAlreadyAdded(selectedStudent)) {
        setStudentClass(prevStudentClass => [
          ...prevStudentClass,
          {
            privateId: selectedStudent.privateId,
            student: {
              name: selectedStudent.student.name,
            },
          },
        ]);
      }else {
        // إذا كان موجودًا، قم بإزالته من الجدول
          removeStudent(selectedStudent);
      }
    };
    

    useEffect (() => {
      const delaySearch = setTimeout (() => {
          const fetchData = async () => {
              try {
                  const url = `/api/Teacher/student/search/${searchWord}`;
                  const response = await axios.get (url);
                  setData (response.data);
              } catch (error) {
                  console.error (error);
              }
          };
          fetchData ();
      }, 1000);

      return () => clearTimeout (delaySearch);
  }, [searchWord]);





    const handleDropdownOpen = () => {
        if (isDropdownOpenStudent) {
            setIsDropdownOpenStudent (false);
        }
        setIsDropdownOpen (!isDropdownOpen);
    };


    const handleDropdownOpenStudent = (event) => {
        if (isDropdownOpen) {
            setIsDropdownOpen (false);
        }
        setIsDropdownOpenStudent (!isDropdownOpenStudent);

    };

    const removeClassStudents = (classId) => {
        setSelectedClasses(prevSelectedClasses => prevSelectedClasses.filter(id => id !== classId))
        setStudentClass(prevStudentClass => prevStudentClass.filter(st => st.classId !== classId));
    }
    const handleClassSelection = async  (classId) => {
        console.log(classId)
        if(selectedClasses.includes(classId)){
            removeClassStudents(classId)

        }else {
            const response = await axios.get(`/api/Teacher/class/${classId}?requiredStudents=true&requiredSections=false`)
                    setStudentClass(prev=>[...prev,...response.data.students]);
        setSelectedClasses(prevSelectedClasses => [...prevSelectedClasses, classId]);
        }


    };


    function OrderCards () {
        if(studentClass.length==0){
            sendToast("يجب اختيار طلاب","error")
            return;
        }

        let responseData = []
for (const item of studentClass) {
    responseData.push(item.privateId);
}
 axios.post ( "/api/Teacher/Cards", responseData )
            .then ( response => {
            sendToast("تم طلب الكروت بنجاح","success")
                setTimeout(() => {
                    window.location.href = "/cards"
                }, 1000);
            } )
            .catch ( error => {
                sendToast("حدث خطأ أثناء طلب الكروت","error")
                console.log ( error );
            } );

    }

    return (
    <div className="pt-20 px-4">
        <div className='flex flex-row-reverse justify-center w-[50%] 2sm:w-full m-auto gap-20 2sm:gap-6'>
            <ToastContainer/>
            <div className="relative">
                <button onClick={handleDropdownOpenStudent} id="dropdownBgHoverButton"
                        data-dropdown-toggle="dropdownBgHover"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"> اختيار صف
                    <svg className={`w-2.5 h-2.5 ms-3 ${isDropdownOpenStudent ? "rotate-180" : ""}`} aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {/* Dropdown menu */}
                <div id="dropdownBgHover"
                     className={`z-10 ${isDropdownOpenStudent ? "block" : "hidden"} w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-14 2sm:right-[-20px] right-0 `}>
                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownBgHoverButton">
                        {classes.map ( (clas) => (
                            <li key={clas.id}>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input id={`checkbox-item-${clas.id}`} type="checkbox"
                                           value={selectedClasses.includes ( clas.id )}
                                           onChange={() => handleClassSelection ( clas.id )} defaultValue
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor={`checkbox-item-${clas.id}`}
                                           className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{clas.name}</label>
                                </div>
                            </li>
                        ) )}
                    </ul>
                </div>
            </div>
     
            <div className="relative">
                <button onClick={handleDropdownOpen} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch"
                        data-dropdown-placement="bottom"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">اختيار طالب <svg
                    className={`w-2.5 h-2.5 ms-3 ${isDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="m1 1 4 4 4-4"/>
                </svg>
                </button>
                {/* Dropdown menu */}
                <div id="dropdownSearch" className={`z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                } w-48 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-14 right-0 2sm:left-0`}
                >
                    <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div
                                className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" value={searchWord} onChange={(e) => setSearchWord ( e.target.value )}
                                   id="input-group-search"
                                   className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search user"/>
                        </div>
                    </div>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownSearchButton">
                        {data.map ( (student) => (
                            <li key={student.student.id} onClick={() => handelstudent ( student )}>
                                <div
                                    className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input checked={isStudentAlreadyAdded ( student )} id="checkbox-item-11"
                                           type="checkbox" defaultValue=""
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="checkbox-item-11"
                                           className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{student.student && student.student.name}</label>
                                </div>
                            </li>
                        ) )}

                    </ul>

                </div>
            </div>
        </div>
        <div className="mt-8 flex flex-col-reverse justify-center items-center gap-6"> 
        <h1 className=" text-xl"> <span className="text-side12-color text-xl">{studentClass.length}</span> : عدد الكروت  </h1>
            <button onClick={OrderCards} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch"
                    data-dropdown-placement="bottom"
                    className="text-white bg-blue-700 w-36 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">طلب الكروت
            </button>
            </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-28 2sm:mt-16">
            <table className=" w-full text-sm  text-end text-gray-500 dark:text-gray-400">
                <thead
                    className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white text-xl 2sm:text-base">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        حذف
                    </th>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        اسم الطالب
                    </th>
                </tr>
                </thead>
                <tbody>
                {studentClass.map ( (st) => (

                    <tr className="bg-white dark:bg-gray-800 text-white text-xl 2sm:text-base">
 
              <td className="px-6 py-4 text-red-600">
                <DeleteIcon onClick={()=>removeStudent(st)} sx={{ fontSize: 30 }}/>
              </td>
              <td className="px-6 py-4">
               {st.privateId}
              </td>
              <td className="px-6 py-4">
                {st.student.name}
              </td>
          
            </tr>
                ))}

                </tbody>
            </table>
        </div>

    
    </div>
  )
}

export default page