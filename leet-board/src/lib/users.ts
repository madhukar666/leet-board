

// import type {NextApiResponse,NextApiRequest} from "next";
import mongoose from "mongoose"
import boardSchema from "@/lib/boards";

const userSchema = new mongoose.Schema({

    firstName : {
            type : mongoose.Schema.Types.String,
            required : true,
    },
    lastName : {
            type : mongoose.Schema.Types.String,
            required : true,
    },
    username : {
        type : String,
        default : "*",
        unique : true,
        required : true
    },

    email : {
            type : mongoose.Schema.Types.String,
            unique : true,
            required : true,
    },
    password : {
            type : mongoose.Schema.Types.String,
            required : true,
    },

    boards : {
        type : [boardSchema],
        default : [],
    }
});



const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User
