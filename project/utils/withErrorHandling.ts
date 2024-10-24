import { NextResponse } from "next/server";
import { DatabaseError } from "pg";
import {getErrorMessage, mapErrorCodeToStatus} from "../utils/databaseError"
import { NotFoundError } from "./errors";

export function withErrorHandling(handler:(request:Request)=>Promise<Response>){
    try{
        return async (request:Request): Promise<Response> =>{
            try{
                return await handler(request);
            }
            catch(e){
                if (e instanceof DatabaseError){
                    const error = getErrorMessage(e.code as string)
                    const status = mapErrorCodeToStatus(e.code as string)
                    return NextResponse.json({error:error}, {status:status})
                }
                else if (e instanceof NotFoundError){
                    return NextResponse.json({error:e.message}, {status:404})
                }
                throw e;
            }
        }
    } catch{
        return NextResponse.json({error: "internal server error"}, {status:500});
    }
}

export function withErrorHandlingWithParams(handler:(request:Request, { params }: { params: Promise<{ id: string }> })=>Promise<Response>){
    try{
        return async (request:Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> =>{
            try{
                return await handler(request, {params});
            }
            catch(e){
                if (e instanceof DatabaseError){
                    const error = getErrorMessage(e.code as string)
                    const status = mapErrorCodeToStatus(e.code as string)
                    return NextResponse.json({error:error}, {status:status})
                }
                else if (e instanceof NotFoundError){
                    return NextResponse.json({error:e.message}, {status:404})
                }
                throw e;
            }
        }
    } catch{
        return NextResponse.json({error: "internal server error"}, {status:500});
    }
}
