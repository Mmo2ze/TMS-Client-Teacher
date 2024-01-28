import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from 'axios'


export async function POST(req:NextRequest) {
    let token = cookies().get("sesstion");
    let instance = axios.create({
        baseURL: "https://api.tass.ist/",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
    });
    if(token!= null && token.value != undefined && token.value != ""){
        // console.log("token",token)
        instance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }else {
        return NextResponse.json({ message: "not authorized" },{status:401});
    }
    const {code} = await req.json()
    if(code.length !=4){
        return NextResponse.json({ errors: 'invalid code' }, { status: 400 });
    }

    console.log(code)
    try{


        let res = await instance.post("/api/Auth/teacher/verify",code)
        console.log(res.data)
        var jwt = res.data.data.token;
        cookies().set('sesstion',jwt,{
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            httpOnly:true,
            secure:false,
            path:"/",
        })
        return NextResponse.json({ message: "success" });
    }catch(err){
        console.log(err.response.data)
        if(err.response.status == 400){
            if(err.response.data.messages != undefined) {
                switch (err.response.data.messages[0].statusCode) {
                    case 901:
                        var jwt = err.response.data.data.token;
                        cookies().set('sesstion',jwt,{
                            httpOnly:true,
                            secure:false,
                            path:"/",
                        })
                        return NextResponse.json({ errors: 'invalid code' }, { status: 400 });
                        case 902:
                            cookies().delete('sesstion')
                        return NextResponse.json({ errors: 'code used' }, { status: 400 });
                    case 903:
                        cookies().delete('sesstion')
                        return NextResponse.json({ errors: 'code expired' }, { status: 400 });
                    default:
                        cookies().delete('sesstion')
                        return NextResponse.json({ errors: 'Unknown error' }, { status: 500 });
                }
            }
        }
        if(err.response.status == 401){
            // var jwt = err.response.data.data.token;
            cookies().delete('sesstion')
            return NextResponse.json({ errors: 'invalid token' }, { status: 401 });
        }
        console.log(err.response)
        if(err.response.data.messages[0].statusCode == 403)
            // return NextResponse({redirect:{destination:"/login",permanent:false}})
            return NextResponse.json({ errors: 'You are not autorized' }, { status: 403 });
        else
            return NextResponse.json({ errors: 'Unknown error' }, { status: 500 });
    }

}