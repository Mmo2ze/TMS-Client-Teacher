'use client'
import {useAuth} from "../../../../AppState.js";
import {useEffect, useState} from "react";
import Spinners from "../../../ui/Spinners";
function Page(prop) {
    const {Roles, HaveRole, axios} = useAuth ();
    const [quizzes, setQuizzes] = useState ( [] );

    useEffect ( () => {
        if(HaveRole(["Teacher", "Assistant"]))
        axios.get(`api/Teacher/student/quiz/${prop.params.id}?limit=10&page=1`).then((res) => {
            console.log(res.data);
            setQuizzes(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [Roles] );

    function UpdateQuiz(id){
        const body = {
            degree: 10,
            rate: 10
        }
        axios.put(`api/Teacher/quiz/${id}`,body).then((res) => {
    let updatedQuiz = res.data.data;
     let newQuizzes = quizzes.map((quiz) => {
        if (quiz.id === updatedQuiz.id) {
            return updatedQuiz;
        }
        return quiz;
    })
    setQuizzes(newQuizzes);
        }).catch((err) => {
            console.log(err);
        })
    }

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
                {quizzes.map ( (quiz) => (
                        <div>
                            <h1>Quiz Id :{quiz.id}</h1>
                            <h1>Quiz degree :{quiz.degree}</h1>
                            <h1>Quiz Date :{quiz.date}</h1>
                            <h1>Quiz Rate : {quiz.rate}</h1>
                            {HaveRole(["Teacher","RecordQuiz"]) && <button onClick={() => UpdateQuiz ( quiz.id )}>Update</button>}
                            <h1></h1>
                            {HaveRole(["Teacher","RecordQuiz"]) &&<button className="red" onClick={() => DeleteQuiz ( quiz.id )}>Delete</button> }

                        </div>
                    )
                )}
            </div>
        )
    }
}

export default Page;