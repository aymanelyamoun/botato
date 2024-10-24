import { NextResponse } from "next/server"
import company from "@/database/company";
import { withErrorHandling } from "@/utils/withErrorHandling";
import validators from "@/validators";
import * as dto from "@/dto"
import { NextRequestHandlerFunc } from "@/types";

export const dynamic = 'force-dynamic'

async function getHandler(_request:Request) {
    return NextResponse.json(await company.getAll());
}

async function postHandler(request: Request) {
    try{
        const body = await request.json()
        const {error} = validators.company.createCompanySchema.validate(body)
        if (error){
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
        }
        return NextResponse.json(await company.createOne(body), {status:201});
    } catch{
        return NextResponse.json({ error: "error parsing the body" }, { status: 400 });
    }
}


async function updateHandler(request:Request) {
        const body = await request.json() as dto.Company.UpdateOne
        const {error} = validators.company.updateCompanySchema.validate(body)
        if (error){
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
        }
        return NextResponse.json(await company.updateOne(body), {status:201});
}

export const GET = withErrorHandling(getHandler) as NextRequestHandlerFunc  
export const POST = withErrorHandling(postHandler) as NextRequestHandlerFunc  
export const PATCH = withErrorHandling(updateHandler) as NextRequestHandlerFunc  
