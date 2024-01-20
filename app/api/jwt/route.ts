import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from 'axios'


export async function GET(req:NextRequest) {

    let token = cookies().get("sesstion");
    if(token == null || token.value == undefined || token.value == ""){
        return NextResponse.json({ message: "not authorized" },{status:401});
    }
    return NextResponse.json({ token:token.value });
}
export async function DELETE(req:NextRequest) {

    cookies().delete('sesstion')
    return NextResponse.json({  });
}