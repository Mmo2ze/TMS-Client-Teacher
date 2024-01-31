'use client'
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {ToastContainer} from "react-toastify";
import {sendToast} from "../../func/toast";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
import Spinners from "../../ui/Spinners";
function Page(props) {

    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
    const [cards, setCards] = useState ( [] )
    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        axios.get ( `api/v1/Teacher/Cards/${props.params.id}` )
            .then ( response => {
                setCards ( response.data )
            } ).catch ( err => {
            console.log ( err );
        } )
    }, [Roles] )


    function UpdateOrder () {
        if (cards.length == 0) {
            sendToast ( "لا يمكنك حفظ البيانات فارغة ,يمكنك الغاء الطلب بدلا من ذلك", "error" );
            return;
        }
        let data = []
        cards.map ( (card) => {
            data.push ( card.privateId )
        } )
        axios.put ( `api/v1/Teacher/Cards/${props.params.id}`, data )
            .then ( response => {
                sendToast ( "تم تحديث البيانات بنجاح", "success" )
                setTimeout ( () => window.location.href = "/cards"
                    , 2000 );
            } ).catch ( err => {
            sendToast ( "حدث خطأ ما", "error" );
        } )
    }

    function removeStuent (student) {
        setCards ( (prevArray) => prevArray.filter ( (obj) => obj.privateId !== student.privateId ) );
    }

    if (HaveRole ( [null] )) return <Spinners/>;
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20 px-4  ">
                <ToastContainer/>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={UpdateOrder}>
                    حفظ التغيرات
                </button>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
                        <thead
                            className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
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
                        {cards.map ( (student) => (

                            <tr className="bg-white border-b text-base dark:bg-gray-800 dark:border-gray-700 text-white">
                                <td className="px-6 py-4 text-color-red cursor-pointer">
                                    <DeleteIcon onClick={() => removeStuent ( student )}/>
                                </td>
                                <td className="px-6 py-4">
                                    {student.name}
                                </td>
                                <td className="px-6 py-4">
                                    {student.privateId}
                                </td>
                                <td className="px-6 py-4">
                                    {student.classId}
                                </td>
                            </tr>
                        ) )}

                        </tbody>
                    </table>
                </div>
            </div>
        )


    } else {
        router.push ( "/login" );
    }
}
export default Page;


