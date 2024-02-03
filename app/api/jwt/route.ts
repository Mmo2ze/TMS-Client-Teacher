import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from 'next/server'

import axios from 'axios'


export async function GET(req:NextRequest) {

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('Access-Control-Allow-Origin', '*')
    requestHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    })

    // Set a new response header `x-hello-from-middleware2`
    response.headers.set('x-hello-from-middleware2', 'hello')
    let token = cookies().get("session");
    if(token == null || token.value == undefined || token.value == ""){

       // return NextResponse.json({ message: "not authorized" },{status:401});
        let body = JSON.stringify({message:"not authorized"})
        return new Response( body, {

            status: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }

    let body = JSON.stringify({token:token.value})
    return new Response( body, {

        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
    // return NextResponse.json({ token:token.value },{status:200}, );
}
export async function DELETE(req:NextRequest) {

    cookies().delete('session')
    return NextResponse.json({  });
}