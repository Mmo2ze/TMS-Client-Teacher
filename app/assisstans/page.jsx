"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinners from "../ui/Spinners";
import ButtonAdd from "../ui/ButtonAdd";
import PopAddAssistant from "../ui/home/PopAddAssistant";
import BoxAssistant from "../ui/home/BoxAssistant";
import { ToastContainer, toast } from "react-toastify";
import {useAuth} from "/AppState";

export default function Home() {
  const [showAddAssistant, setShowAddAssistant] = useState(false); const router = useRouter();
  const { HaveRole, Roles ,axios} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([""]);


  useEffect(() => {
    if(HaveRole([null])) return;
    const getdata = async () => {
      try {
        const response = await axios.get("/api/Teacher/assistant");
        setData(response.data);
          console.log(`tha data in rolse is ${data}`);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getdata();
  }, [Roles]);


  const restartData = async () => {
    try {
      const response = await axios.get("/api/Teacher/assistant");
      setData(response.data);
      setIsLoading(false);
      console.log(`tha data in rolse is  2 ${data.roles}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (HaveRole([null])) return <Spinners />;
  else if (HaveRole(["Teacher"])) {
    return (
      <main className="pt-20">
        <ToastContainer />
        {showAddAssistant && (
          <div className="overlay">
            {" "}
            <PopAddAssistant
                axios={axios}
              restartData={restartData}
              onCansle={() => setShowAddAssistant(!showAddAssistant)}
            />{" "}
          </div>
        )}
        {/* <div className="text-end">
        <Button text="المساعدين"/>
      </div> */}
        <div className="text-end">
          <ButtonAdd
            onClick={() => setShowAddAssistant(!showAddAssistant)}
            text="اضافة مساعد"
          />
        </div>
        {isLoading && <Spinners />}
        <div className="p-4 grid grid-cols-2 gap-4 2sm:grid-cols-1">
          {!isLoading &&
            data.map((da) => (
              <BoxAssistant
                  axios={axios}
                restartData={restartData}
                name={da.name}
                phone={da.phone}
                roles={da.roles}
                id={da.id}
                key={da.id}
                rolesValues={da.roles.map(role => role.value)}

              />
            ))}
        </div>
      </main>
    );
  } else {
    router.push("/login");
  }
}

