'use client'
import PaymentTable from ".//ui/PaymentsTable/AllPaymentsTabel";
import {useAuth} from "/AppState";
import {useEffect} from "react";
import Spinners from './/ui/Spinners'
import Link from 'next/link';
import { useRouter } from "next/navigation";

const Page = () => {
    const {HaveRole, Roles, axios} = useAuth ();
    const router = useRouter ();



    if (HaveRole ( [null] )) return <Spinners/>

    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20">
                {HaveRole ( ["Teacher","AddPayment"] ) &&
                <PaymentTable axios={axios}/>
                }
      

            </div>
        );
    }else router.push("/login");

}

export default Page;