"use client"
import {useState, useEffect} from 'react'
import axios from "../../config/axiosconfigClient"


const page = () => {
    const [classes, setClasses] = useState ([""]);
    const [studentsClass, setStudentsClass] = useState ([""]);
    const [students, setStudents] = useState ([""]);
    const [isLoading, setIsLoading] = useState (true);
    const [isDropdownOpen, setIsDropdownOpen] = useState (false);
    const [isDropdownOpenStudent, setIsDropdownOpenStudent] = useState (false);
    const [searchWord, setSearchWord] = useState ('');
    const [students2, setStudents2] = useState ([]);
    const [FinalStudents, setFinalStudents] = useState ([]);
    const [data, setData] = useState ([]);
    const [selectedStudents, setSelectedStudents] = useState ([]);
    const [selectedClasses, setSelectedClasses] = useState ([]);
    const [selectedStudent, setSelectedStudent] = useState (null);


    useEffect (() => {
        const getdata = async () => {
            try {
                const response = await axios.get ("/api/Teacher/class");
                setClasses (response.data);
                setIsLoading (false);

            } catch (e) {
                console.log (e);
            }
        };

        getdata ();
    }, []);

    const handleChange = async (event) => {
        const selectedClassId = event.target.value;

        if (!selectedClasses.includes (selectedClassId)) {
            setSelectedClasses ((prevSelectedClasses) => [...prevSelectedClasses, selectedClassId]);
        }

        try {
            const response = await axios.get (`/api/Teacher/class/${selectedClassId}?requiredStudents=true`);
            const studentsForClass = response.data.students;
            setFinalStudents ((prevClassIds) => [...prevClassIds, ...studentsForClass]);
            setStudentsClass ((prevStudents) => [...prevStudents, ...studentsForClass]);
        } catch (error) {
            console.error (error);
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

        const selectedStudentId = event.target.value;
        const selectedStudent = students.find ((student) => student && student.student && student.student.id === selectedStudentId);

        if (selectedStudent && !selectedStudents.some ((student) => student && student.student && student.student.id === selectedStudentId)) {

            setSelectedStudentssetSelectedStudents ((prevSelectedStudents) => [...prevSelectedStudents, selectedStudent]);
        }
    };

    useEffect(() => {
        let uniqueArray = FinalStudents.filter(
            (obj, index, self) =>
                index === self.findIndex((o) => o.privateId === obj.privateId )
        );
        setFinalStudents(uniqueArray)
    }, [selectedStudents, selectedClasses]);



    const handelstudent = (selectedStudent) => {
        if (!FinalStudents.some ((student) => student && student.student && student.student.privateId === selectedStudent.privateId)) {
            setFinalStudents( ((prevSelectedStudents) => [...prevSelectedStudents, selectedStudent]));
        }

    };

    var responseData = [];

    function OrderCards () {


        [...FinalStudents].map ((student) => {
            responseData.push (student.privateId);
        });
        try {
            axios.post ('api/Teacher/Cards', responseData).then((res) => {
                console.log("done")
                setTimeout(() => {
                        window.location.href = 'cards';
                }, 5000);
            })
        }catch (e){
            console.log(e)
        }
    }

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
                        >
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownBgHoverButton">
                                <li>
                                    <div>
                                        <input
                                            type="search"
                                            id="default-search"
                                            autoComplete="off"
                                            value={searchWord}
                                            onChange={(e) => setSearchWord (e.target.value)}
                                            className="block text-end w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="البحث عن طالب"
                                            required
                                        />
                                    </div>
                                </li>
                                {data.map ((student) => (
                                    // <li onClick={() => handelstudent(student.student && student.student.name)}>
                                    <li key={student.student.id} onClick={() => handelstudent (student)}>
                                        <div
                                            className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="checkbox-item-4" type="checkbox" defaultValue
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <label htmlFor="checkbox-item-4"
                                                   className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{student.student && student.student.name}</label>
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
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownBgHoverButton">
                                {classes.map ((cl) => (
                                    <li onChange={handleChange}>
                                        <div
                                            className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input

                                                id={`checkbox-item-${cl.id}`}
                                                type="checkbox"
                                                value={cl.id}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label htmlFor={`checkbox-item-${cl.id}`}
                                                   className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                                {cl.name}
                                            </label>
                                        </div>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>

                </div>

            </div>
            <div className="flex justify-center my-12">
                <button onClick={OrderCards} type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    طلب الكروت
                </button>

            </div>
            <div>
                {FinalStudents.map ((d) => (
                    <h1>name student :{d.student.name}</h1>
                ))}
            </div>
        </div>
    )
}

export default page
// const rolseAssistant = ["اضافة طالب","اضاقة صف","اضافة مساعد","مشاهدة المدفوعات"]




