import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },
    
    channelName:{
        type: String,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
    joinedon:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", authSchema);

export default User;