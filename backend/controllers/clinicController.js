const asyncHandler=require("express-async-handler");
const clinic=require("../models/clinicModel");

//@desc Get all clinics
//@route GET /api/clinics
//@access private
const getclinics=asyncHandler(async(req,res)=>{
    const clinic=await clinic.find({ user_id: req.user.id});
    res.status(200).json(clinic);
});
//@desc Create New clinic
//@route POST /api/clinics
//@access private
const createclinic=asyncHandler(async(req,res)=>{
    console.log("The request body is:",req.body);
    const{name,email,phone}=req.body;
    if(!name || !phone || !qualification || !pin_code || !location){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const clinic=await clinic.create({
        name,
        email,
        phone,
        qualification,
        pin_code,
        location,
        user_id: req.user.id,
    });
    res.status(201).json(clinic);
});
//@desc Get clinic
//@route GET /api/clinics/:id
//@access private
const getclinic=asyncHandler(async(req,res)=>{
    const clinic=await clinic.findById(req.params.id);
    if(!clinic){
        res.status(404);
        throw new Error("clinic not found");
    }
    res.status(200).json(clinic);
});
//@desc Update clinic
//@route PUT /api/clinics/:id
//@access private
const updateclinic=asyncHandler(async(req,res)=>{
    const clinic=await clinic.findById(req.params.id);
    if(!clinic){
        res.status(404);
        throw new Error("clinic not found");
    }
    if(clinic.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User don't have access to update other user clinics");
    }

    const updatedclinic=await clinic.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedclinic);
});
//@desc Delete clinic
//@route DELETE /api/clinics/:id
//@access private
const deleteclinic = asyncHandler(async (req, res) => {
    const clinic = await clinic.findById(req.params.id);
    if (!clinic) {
      res.status(404);
      throw new Error("clinic not found");
    }

    if(clinic.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User don't have access to delete other user clinics");
    }

    await clinic.deleteOne({ _id: req.params.id });
    res.status(200).json(clinic);
  });

module.exports={getclinic,createclinic,getclinics,updateclinic,deleteclinic};