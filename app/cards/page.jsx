'use client'
import { useState, useEffect } from "react";
import axios from "../config/axiosconfigClient"
import Link from "next/link";
import CreateIcon from '@mui/icons-material/Create';
import Spinners from "../ui/Spinners";
function Page(){


    const [orders, setOrders] = useState([])
    const [ordersFound, setOrdersFound] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        axios.get("api/Teacher/Cards")
        .then(response=>{
            setIsLoading(false)
            setOrders(response.data);
            if(response.data.length==0)
                setOrdersFound(false)
        }).catch(err=>{
            setIsLoading(false)

            console.log(err);
        })
    },[])
    return(
        <div className="pt-20 px-4  ">
           
      
                    <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white rounded-lg">
                      <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                          تعديل
                          </th>
                          <th scope="col" className="px-6 py-3">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            الحالة
                          </th>
                          <th scope="col" className="px-6 py-3">
                            تاريخ الطلب
                          </th>
                          <th scope="col" className="px-6 py-3">
                            السعر
                          </th>
                          <th scope="col" className="px-6 py-3">
                            عدد الكروت
                          </th>
                     
                        </tr>
                      </thead>
                      <tbody>  
                        { orders.map ( (order) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-base">
                              <Link href={`/cards/${order.id}`}> 
                          <td className="px-6 py-4 text-color-aqua">
                          <CreateIcon/>
                          </td>
                          </Link>

                          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order.id}
                          </td>

                          <td className="px-6 py-4" style={{ color: order.orderStatus === "Pending" ? "gold" : order.orderStatus === "ok" ? "green" : "blue" }}>
  {order.orderStatus === "Pending" ? "معلق" : order.orderStatus === "ok" ? "تم" : "الغاء"}
</td>
                          <td className="px-6 py-4">
                            {order.orderedOn}
                          </td>
                          <td className="px-6 py-4">
                          {order.totalPrice}
                          </td>
                          <td className="px-6 py-4">
                          {order.totalPrice/10}
                          </td>
                    
                        </tr>
    
                    ) )}
                      </tbody>
                    </table>
                    </div>
            { !ordersFound &&
                <h1>لا يوجد طلبات</h1>
            }
            { isLoading &&
               <Spinners/>
            }

        </div>
    )
}

export default Page;     
{/* <Link  href={`/cards/${order.id}`}> */}
