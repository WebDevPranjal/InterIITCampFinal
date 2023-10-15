const express=require("express");
const router=express.Router();
const {gethospital,createhospital,gethospitals,updatehospital,deletehospital}=require("../controllers/hospitalController");
router.route('/').get(gethospitals).post(createhospital);
router.route('/:id').get(gethospital).put(updatehospital).delete(deletehospital);

module.exports=router;