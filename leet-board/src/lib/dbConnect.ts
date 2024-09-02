

import mongoose from "mongoose";

type ConnectionObject = {

        isConnected?:Number
}

const connection:ConnectionObject = {}

const  connect = async ()=>{

    if(connection.isConnected){

        console.log("Already connected")
        return
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI as any | "",{});

        connection.isConnected = db.connections[0].readyState

        console.log("Database connection gained successfully")
    }
    catch(error){
            console.log(`Database connection err:${error}`)
    }
}
export default connect;

