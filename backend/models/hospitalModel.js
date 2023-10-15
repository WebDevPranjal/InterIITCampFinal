const mongoose=require("mongoose");


const hospitalSchema=mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },

    name:{
        type:String,
        required:[true,"Please add the clinic name"],
    },
    email:{
        type:String,
        required:[true,"Please add the clinic email address"]
    },
    phone:{
        type:String,
        required:[true,"Please add the clinic phone number"]
    },
    pin_code:{
        type:Number,
        required:[true,"Please provide pin code of your location"]
    },
    location:{
        type:Number,
        required:[true,"Please provide your location"]
    },
    specialisation:{
        type:String,
        required:[false,"Please provide your specialisation(if any)"]
    },
    type:{
        type:String,
        required:[true,"Please provide your specialisation(if any)"]
    },
    services_av:{
        type:String,
        required:[false,"Please provide services that are being provided"]
    },
    complaints:{
        type:Number,
        required:[false,"Complain"]
    },

},{
    timestamps:true,
});

module.exports=mongoose.model("hospital",hospitalSchema);