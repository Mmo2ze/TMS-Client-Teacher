'use client'
import {useAuth} from "../../../../AppState.js";
import {useEffect, useState} from "react";
import Spinners from "../../../ui/Spinners";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopUpdateQuiz from './../../../ui/student/PopUpdateQuiz';

function Page(prop) {
    const {Roles, HaveRole, axios} = useAuth ();
    const [quizzes, setQuizzes] = useState ( [] );
    const [showPopUpdate , setShowPopUpdate] = useState(false)

    useEffect ( () => {
        if(HaveRole(["Teacher", "Assistant"]))
        axios.get(`api/Teacher/student/quiz/${prop.params.id}?limit=10&page=1`).then((res) => {
            console.log(res.data);
            setQuizzes(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [Roles] );

 

    function DeleteQuiz (id) {
        axios.delete(`api/Teacher/quiz/${id}`).then((res) => {
            let newQuizzes = quizzes.filter((quiz) => {
                return quiz.id !== id;
            })
            setQuizzes(newQuizzes);
        }).catch((err) => {
            console.log(err);
        })
    }

    if (HaveRole ( [null] ))
        return <Spinners/>
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20 px-4">
                {showPopUpdate && ( <div className="overlay"> <PopUpdateQuiz axios={axios} onCansle={() => setShowPopUpdate(!showPopUpdate)}/> </div>)}

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
                                                    <DeleteIcon onClick={() => deletePayment ( payment )}/>
                                                </td>
                                                <td className="px-6 py-4 text-color-aqua cursor-pointer">
                                                    <EditIcon onClick={() => setShowPopUpdate ( !showPopUpdate )}/>
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