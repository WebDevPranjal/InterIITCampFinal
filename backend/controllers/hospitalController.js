const asyncHandler=require("express-async-handler");
const hospital=require("../models/hospitalModel");

//@desc Get all hospitals
//@route GET /api/hospitals
//@access private
const gethospitals=asyncHandler(async(req,res)=>{
    const hospital=await hospital.find({ user_id: req.user.id});
    res.status(200).json(hospital);
});
//@desc Create New hospital
//@route POST /api/hospitals
//@access private
const createhospital=asyncHandler(async(req,res)=>{
    console.log("The request body is:",req.body);
    const{name,email,phone}=req.body;
    if(!name || !email || !phone || !type || !pin_code || !location){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const hospital=await hospital.create({
        name,
        email,
        phone,
        specialisation,
        type,
        pin_code,
        location,
        complain,
        services_av,
        user_id: req.user.id,
    });
    res.status(201).json(hospital);
});
//@desc Get hospital
//@route GET /api/hospitals/:id
//@access private
const gethospital=asyncHandler(async(req,res)=>{
    const hospital=await hospital.findById(req.params.id);
    if(!hospital){
        res.status(404);
        throw new Error("hospital not found");
    }
    res.status(200).json(hospital);
});
//@desc Update hospital
//@route PUT /api/hospitals/:id
//@access private
const updatehospital=asyncHandler(async(req,res)=>{
    const hospital=await hospital.findById(req.params.id);
    if(!hospital){
        res.status(404);
        throw new Error("hospital not found");
    }
    if(hospital.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User don't have access to update other user hospitals");
    }

    const updatedhospital=await hospital.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedhospital);
});
//@desc Delete hospital
//@route DELETE /api/hospitals/:id
//@access private
const deletehospital = asyncHandler(async (req, res) => {
    const hospital = await hospital.findById(req.params.id);
    if (!hospital) {
      res.status(404);
      throw new Error("hospital not found");
    }

    if(hospital.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User don't have access to delete other user hospitals");
    }

    await hospital.deleteOne({ _id: req.params.id });
    res.status(200).json(hospital);
  });

module.exports={gethospital,createhospital,gethospitals,updatehospital,deletehospital};