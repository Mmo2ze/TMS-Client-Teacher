'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import Spinners from "../ui/Spinners";
import AddIcon from '@mui/icons-material/Add';
// import PopDeleteOrder from "../ui/popdeleteorder";
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
import PopDeleteCard from "../ui/PopDeleteCard";
import {ToastContainer} from "react-toastify";

function Page() {
    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [orders, setOrders] = useState ( [] )
    const [ordersFound, setOrdersFound] = useState ( true )
    const [isLoading, setIsLoading] = useState ( true );
    const [showDelete, setShowDelete] = useState ( false )

    const [deleteId, setDeleteId] = useState ( null )
    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        axios.get ( "api/v1/Teacher/Cards" )
            .then ( response => {
                setIsLoading ( false )
                setOrders ( response.data );
                if (response.data.length === 0)
                    setOrdersFound ( false )
            } ).catch ( err => {
            setIsLoading ( false )

            console.log ( err );
        } )
    }, [Roles] )

    const update = async () => {
        axios.get ( "api/v1/Teacher/Cards" )
        .then ( response => {
            setIsLoading ( false )
            setOrders ( response.data );
            if (response.data.length === 0)
                setOrdersFound ( false )
        } ).catch ( err => {
        setIsLoading ( false )
        console.log ( err );
    } )
     }

    const handelDelete = (id) => {
        setShowDelete ( !showDelete )
        setDeleteId ( id );
    }
    const updateObject = (id, updatedData) => {
        setOrders ( (prevArray) =>
            prevArray.map ( (obj) => (obj.id === id ? {...obj, ...updatedData} : obj) )
        );
    };
    if (HaveRole ( [null] )) return <Spinners/>;
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20 px-4  ">
                <ToastContainer/>
                {showDelete && ( <div className="overlay"> <PopDeleteCard restartData={update} axios={axios} id={deleteId} onGet={() => getdata()} onCansle={() =>  setShowDelete ( !showDelete )}/> </div>)}

                {/*{showDelete && (*/}
                {/*    <div className="overlay">*/}
                {/*        <PopDeleteOrder  axios={axios} id={deleteId} restartData={updateObject} onCancel={() => {*/}
                {/*            setShowDelete ( !showDelete )*/}
                {/*        }}/>*/}
                {/*    </div>*/}
                {/*)}*/}
                <Link href="/cards/add">
                    <div className="text-color-text text-end mb-4">
                        <AddIcon sx={{fontSize: 60}}/>
                    </div>
                </Link>
                <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white rounded-lg">
                        <thead
                            className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                تعديل
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
                        {orders.map ( (order) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-base">

                                <td onClick={() => handelDelete ( order.id )} className="px-6 py-4 text-color-red  cursor-pointer">
                                    <DeleteIcon/>
                                </td>
                                <td className="px-6 py-4" style={{color: order.orderStatus === "Pending" ? "gold" : order.orderStatus === "Accepted" ? "green" : "red"}}>
                                <Link href={`/cards/${order.id}`}>
                                        {order.orderStatus === "Pending" ? "معلق" : order.orderStatus === "Accepted" ? "تم" : "تم الالغاء"}
                                </Link>
                                    </td>
                                <td className="px-6 py-4">
                
                                    <Link href={`/cards/${order.id}`}>
                                        {order.orderedOn}
                                </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/cards/${order.id}`}>
                                    {order.count * 10}
                                </Link>
                                </td>
                                <td className="px-6 py-4">
                                <Link href={`/cards/${order.id}`}>
                                    {order.count}
                                </Link>
                                </td>
                            </tr>

                        ) )}
                        </tbody>
                    </table>
                    
                </div>
                { !ordersFound &&
                    <h1 className="text-3xl flex justify-center text-white items-center mt-[20%]">لا يوجد طلبات</h1>
                }
                {isLoading &&
                    <Spinners/>
                }

            </div>
        )
    } else {
        router.push ( "/login" );
    }
}

export default Page;     
{/* <Link  href={`/cards/${order.id}`}> */}
