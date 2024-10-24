import { NextResponse } from "next/server";

export type NextRequestHandlerFunc = (request:Request)=> Promise<NextResponse>
export type NextRequestHandlerFuncParam = (request:Request, { params }: { params: Promise<{ id: string }> })=>Promise<Response>