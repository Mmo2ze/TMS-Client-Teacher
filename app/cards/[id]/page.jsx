'use client'
import { useState, useEffect } from "react";
import axios from "../../config/axiosconfigClient"
import DeleteIcon from '@mui/icons-material/Delete';
function Page(props){


    const [cards, setCards] = useState([])
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
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                حذف
              </th>
              <th scope="col" className="px-6 py-3">
                الاسم
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                 الصف
              </th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (

              <tr className="bg-white border-b text-base dark:bg-gray-800 dark:border-gray-700 text-white">
              <td className="px-6 py-4 text-color-red cursor-pointer">
                <DeleteIcon/>
              </td>
              <td className="px-6 py-4">
              {card.name}
              </td>
              <td className="px-6 py-4">
              {card.privateId}
              </td>
              <td className="px-6 py-4">
              {card.classId}
              </td>
            </tr>
                ))}

          </tbody>
        </table>
      </div>
        </div>
    )


}
export default Page;


