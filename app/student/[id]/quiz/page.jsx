'use client'
import {useAuth} from "../../../../AppState.js";
import {useEffect, useState} from "react";
import Spinners from "../../../ui/Spinners";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopUpdateQuiz from './../../../ui/student/PopUpdateQuiz';
import PopDeleteQuiz from './../../../ui/student/PopDeleteQuiz';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Page(prop) {
    const {Roles, HaveRole, axios} = useAuth ();
    const [quizzes, setQuizzes] = useState ( [] );
    const [showPopUpdate , setShowPopUpdate] = useState(false)
    const [showPopDelete , setShowPoDelete] = useState(false)
    const [theId , setTheId] = useState("")
    const [theIdUpdate , setTheIdUpdate] = useState("")

    useEffect ( () => {
        if(HaveRole([null])) return;
        const getdata = async () => {
       axios.get(`api/v1/Teacher/student/quiz/${prop.params.id}?limit=10&page=1`).then((res) => {
            console.log(res.data);
            setQuizzes(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    getdata()
    }, [Roles] );




    function DeleteQuiz (id) {
        axios.delete(`api/v1/Teacher/quiz/${id}`).then((res) => {
            let newQuizzes = quizzes.filter((quiz) => {
                return quiz.id !== id;
            })
            setQuizzes(newQuizzes);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handeleDelet = (id) => {
        setShowPoDelete ( !showPopDelete )
        setTheId(id)
    }
    const handelUpdate = (id) =>{
        setShowPopUpdate ( !showPopUpdate)
        setTheIdUpdate(id)
    }

    if (HaveRole ( [null] ))
        return <Spinners/>
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20 px-4">
                <ToastContainer/>
                {showPopUpdate && ( <div className="overlay"> <PopUpdateQuiz quizId={theIdUpdate} update={() => getdata()}  axios={axios} onCansle={() => setShowPopUpdate(!showPopUpdate)}/> </div>)}
                {showPopDelete && ( <div className="overlay"> <PopDeleteQuiz update={() => getdata()} id={theId} text="هل انت متأكد من حذف هذا الامتحان للطالب" conferm="بعد تأكيد الحذف لم تستطيع ارجاع درجة هذا الامتحان" axios={axios} onCansle={() => setShowPoDelete (!showPopDelete )}/> </div>)}

                        <div>
                            {/* <h1>Quiz Id :{quiz.id}</h1>
                            <h1>Quiz degree :{quiz.degree}</h1>
                            <h1>Quiz Date :{quiz.date}</h1>
                            <h1>Quiz Rate : {quiz.rate}</h1>
                            {HaveRole(["Teacher","RecordQuiz"]) && <button onClick={() => UpdateQuiz ( quiz.id )}>Update</button>}
                            <h1></h1>
                            {HaveRole(["Teacher","RecordQuiz"]) &&<button className="red" onClick={() => DeleteQuiz ( quiz.id )}>Delete</button> } */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-white">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                         الدرجة
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        اليوم
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                       الدرجة العطمى
                                    </th>   
                                    {HaveRole(["Teacher","AddPayment"]) &&(
                                        <div>
                                    <th scope="col" className="px-6 py-3 pr-16 2sm:pr-4">
                                        حذف
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        تعديل
                                    </th>
                                </div>)}
                                </tr>
                                </thead>

                                <tbody>
                                {quizzes.map ( (quiz) => (
                                    <tr key={quiz} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{quiz.id}</td>
                                        <td className="px-6 py-4">{quiz.degree}</td>
                                        <td className="px-6 py-4">{quiz.date}</td>
                                        <td className="px-6 py-4">{quiz.rate}</td>
                                        
                                         {HaveRole(["Teacher","AddPayment"]) &&(
                                            <div>
                                                <td className="px-6 py-4 pr-16 2sm:pr-4 text-color-red cursor-pointer">
                                                    <DeleteIcon onClick={() => handeleDelet(quiz.id)}/>
                                                </td>
                                                <td className="px-6 py-4 text-color-aqua cursor-pointer">
                                                    <EditIcon onClick={() => handelUpdate(quiz.id)}/>
                                                </td>
                                            </div>
                                            )
                                        }
                                            </tr>
                                            ) )}
                                    </tbody>
                                    </table>

                        </div>
        
            </div>
        )
    }
}

export default Page;