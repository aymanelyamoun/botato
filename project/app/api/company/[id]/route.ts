import * as dto from "@/dto"
import validators from "@/validators"
import company from "@/database/company"
import { NextResponse } from "next/server"
import { withErrorHandlingWithParams } from "@/utils/withErrorHandling"
// import { NextRequestHandlerFunc } from "@/types"
import { NextRequestHandlerFuncParam } from "@/types/nextRequestHandler"

async function getHandler(request:Request , { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const {error} = validators.company.getEmployeesSchema.validate({id})
    if (error)
        return NextResponse.json({error: error.details[0].message}, {status:400})
    const res = await company.getCompanyEmployees({id})
    return NextResponse.json(res)
}

async function deleteHandler(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const {error} = validators.company.deleteCompanySchema.validate({id})
    if (error){
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
        }
    await company.deleteOne({id})
    return NextResponse.json({message:"resource Deleted"})
}

export const GET = withErrorHandlingWithParams(getHandler) as NextRequestHandlerFuncParam
export const DELETE = withErrorHandlingWithParams(deleteHandler) as NextRequestHandlerFuncParam