"use client"
import { useState  , useEffect } from "react";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import BoxSection from '../../../ui/section/BoxSection';
import Spinners from '../../../ui/Spinners';
import AddIcon from '@mui/icons-material/Add';
import PopAddSection from "../../../ui/section/PopAddSection";
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';

import { useRouter } from "next/navigation";
import {useAuth} from "/AppState";
const page = (props) => {
    const [showAddSection, setShowAddSection] = useState ( false )
    const [data, setData] = useState ( "" )
    const [isLoading, setIsLoading] = useState ( true );
    const {HaveRole, Roles, axios} = useAuth ();
    const router = useRouter ();

    useEffect ( () => {
        if (HaveRole ( [null] )) return;
        const getdata = async () => {
            try {
                const response = await axios.get ( `/api/Teacher/class/section/${props.params.id}` );
                setData ( response.data );
                setIsLoading ( false );

            } catch (e) {
                console.log ( e );
            }
        };

        getdata ();
    }, [showAddSection, Roles] );


    const restartData = async () => {
        try {
            const response = await axios.get ( `/api/Teacher/class/section/${props.params.id}` );
            setData ( response.data );
            setIsLoading ( false );

        } catch (e) {
            console.log ( e );
        }
    };

    if (HaveRole ( [null] )) return <Spinners/>;
    else if (HaveRole ( ["Teacher", "Assistant"] )) {
        return (
            <div className="pt-20">
                <ToastContainer/>
                {showAddSection && (<div className="overlay"><PopAddSection axios={axios} restartData={() => getdata ()}
                                                                            onCansle={() => setShowAddSection ( !showAddSection )}
                                                                            id={props.params.id}/></div>)}
                <div className="p-4">
                    <div className="flex  align-center justify-between text-color-text">
                        <div className="cursor-pointer"><Link href={`/classes/student/${props.params.id}`}>
                            <AccessibilityIcon sx={{fontSize: 60}}/> </Link></div>
                        <div className="cursor-pointer" onClick={() => setShowAddSection ( !showAddSection )}><AddIcon
                            sx={{fontSize: 60}}/></div>
                    </div>
                    {isLoading && <Spinners/>}
                    <div>
                        { !isLoading && data.map ( (da) => (

                            <BoxSection day={da.day} key={da.id} starttime={da.startTime} endtime={da.endTime}
                                        axios={axios}
                                        id={da.id} restartData={() => restartData}/>

                        ) )}
                    </div>


                </div>
            </div>
        )
    }
    else {
        router.push ( "/login" );
    }
}
export default page


// classId
// : 
// 27
// day
// : 
// "Sunday"
// endTime
// : 
// "03:30:00"
// id
// : 
// 7
// startTime
// : 
// "01:00:00"
// teacherId
// : 
// 27