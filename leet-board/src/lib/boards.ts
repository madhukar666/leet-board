
import mongoose from "mongoose"


const boardSchema = new mongoose.Schema({

    problem_id : {
        type : mongoose.Schema.Types.Number,
        required : true,
        unique : true,
    },
    version:{
        type:mongoose.Schema.Types.String,
        required : true,
    }
});


export default boardSchema;
