

import {NextRequest,NextResponse} from "next/server";
import User from "@/lib/users"
import connect from "@/lib/dbConnect"

connect();

export async function POST(request : NextRequest){

    try{
        const reqBody = await request.json();
        const {email,username} = reqBody;
        const user = await User.findOneAndUpdate({email},{
            username : username
        });
        if(!user)
            return NextResponse.json({message : "Error occurred"},{status : 200});
        return NextResponse.json({message : "Profile updated successfully",username : user.username},{status : 200});
    }
    catch(Error){
        return NextResponse.json({status : 500});
    }
}
