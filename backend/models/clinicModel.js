const mongoose=require("mongoose");

const clinicSchema=mongoose.Schema({

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
        required:[false,"Please add the clinic email address"]
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
    Qualification:{
        type:String,
        required:[true,"Please provide your qualification"]
    },
    specialisation:{
        type:String,
        required:[false,"Please provide your specialisation(if any)"]
    },
},{
    timestamps:true,
});

module.exports=mongoose.model("clinic",clinicSchema);