'use client'
import Image from 'next/image'
import { useAuth } from "../AppState";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const { HaveRole ,Role} = useAuth();
  const router = useRouter();
  if (HaveRole([null])) return <>loddddding</>;
  else if (HaveRole(["Teacher", "Assistant"])) {
    return (
      <main className="pt-20"> 
        Home
        
      </main> 
    );
  } else {
    router.push("/login");
  }
}
