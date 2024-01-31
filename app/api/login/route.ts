import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from 'axios'


export async function POST(req:NextRequest) {
    console.log(cookies())
    let token = cookies().get("sesstion");
    console.log("token",token)
    let instance = axios.create({
        baseURL: "https://api.tass.ist/",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
    });
    if(token?.value != undefined && token?.value != ""){
    cookies().delete("sesstion")
    }
    const {phone} = await req.json()
    if(phone.length !=11){
        return NextResponse.json({ errors: 'phone is required ' }, { status: 400 });
    }

    console.log(phone)
    try{

    let res = await instance.post("/api/v1/Auth/teacher/login",phone)
        console.log("res",res.data)
    let jwt = res.data.data.token;
    cookies().set('sesstion',jwt,{
        httpOnly:true,
        secure:false,
        path:"/",
    })
    return NextResponse.json({ message: "success" });
    }catch(err){
        console.log(err)
         if(err.response.data.messages[0].statusCode == 403){
          // return NextResponse({redirect:{destination:"/login",permanent:false}})
             return NextResponse.json({ errors: 'You are not autorized' }, { status: 403 });
         }else
             return NextResponse.json({ errors: 'Unknown error' }, { status: 500 });
    }

}