

import {NextRequest,NextResponse} from "next/server";
import User from "@/lib/users"
import connect from "@/lib/dbConnect"

connect();
export default async function POST(request : NextRequest){

    try{
        const reqBody = await request.json();
        const {email,username} = reqBody;

        const user = await User.findOneAndUpdate({email},{
            username : username
        });

        return Response.json({message : "Profile updated successfully"},{status : 200},)
    }
    catch(Error){
        return Response.json({status : 500});
    }
}
