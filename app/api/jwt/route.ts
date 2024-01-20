import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from 'axios'


export async function GET(req:NextRequest) {

    let token = cookies().get("sesstion");
    return NextResponse.json({ token:token.value });
}
export async function DELETE(req:NextRequest) {

    cookies().delete('sesstion')
    return NextResponse.json({  });
}