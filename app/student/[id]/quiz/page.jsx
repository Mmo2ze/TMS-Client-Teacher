import React from 'react'
import Spinners from '../../../ui/Spinners'
import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
const page = () => {
    const router = useRouter ();
    const {HaveRole, Roles, axios} = useAuth ();
  return (
    <div className="pt-20 px-3">

        quiz
        
        </div>
  )
}

export default page