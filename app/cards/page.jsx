'use client'
import { useState, useEffect } from "react";
import axios from "../config/axiosconfigClient"
import Link from "next/link";
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
            {
                orders.map ( (order) => (
                    <div>
                        <Link href={`/cards/${order.id}`}>
                        {order.id} {order.orderedOn} {order.orderStatus} {"Price:"+order.totalPrice} {"Quantity:"+order.totalPrice/10}
                        </Link>
                        <br/>
                    </div>
                ) )
            }
            {
                !ordersFound &&
                <h1>لا يوجد طلبات</h1>
            }
            {
                isLoading &&
                <h1>جاري التحميل</h1>
            }

        </div>
    )
}

export default Page;