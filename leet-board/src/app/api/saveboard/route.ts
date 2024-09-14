
import User from "@/lib/users";
import connect from "@/lib/dbConnect";
import {NextResponse,NextRequest} from "next/server";

connect();
export async function POST(Request : NextRequest){

    try{

        const data = await Request.json();
        console.log(data.problem_title);
        const {problemid,email,board,problem_title} = data;
        const user = await User.findOne({email});
        const boards:Array<any> = user.boards;
        let index = boards.findIndex((board) => {
            return board.problem_id === problemid;
        });
        // console.log(index);

        if(index == -1){
            boards.push({
                problem_id : problemid,
                problem_title : problem_title,
                version : board
            });
            index = boards.length;
        }
        else{
            boards[index].version = board;
        }
        console.log(boards[index].problem_title);
        const update = await User.findOneAndUpdate({email},{...user,boards});
        if(update)
            return NextResponse.json({message : "auto-save completed",currentVersion : update.boards[index]},{status : 200});
        else
            return NextResponse.json({error : "network error"},{status : 400});
    }catch(error){
        return NextResponse.json({error : "network error"},{status : 500});
    }
}