'use client'
import { useState, useEffect } from "react";
import axios from "../../config/axiosconfigClient"

function Page(props){

const StudentCard = {
    "privateId": 1321,
    "name": "محسن محمود عمر",
    "gender": "Male",
    "classId": 54
}
    const [Cards, setCards] = useState([])
    useEffect(()=>{
        axios.get(`api/Teacher/Cards/${props.params.id}`)
        .then(response=>{
            setCards(response.data)
        }).catch(err=>{
            console.log(err);
        })
    },[])
    return(
        <div className="pt-20 px-4  ">
            {
                Cards.map ( (card) => (
                    <div>
                        {card.privateId} {card.name} {card.classid}
                        <br/>
                    </div>
                ) )
            }
        </div>
    )


}
export default Page;
