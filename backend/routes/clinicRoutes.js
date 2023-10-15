const express=require("express");
const router=express.Router();
const {getclinic,createclinic,getclinics,updateclinic,deleteclinic}=require("../controllers/clinicController");
router.route('/').get(getclinics).post(createclinic);
router.route('/:id').get(getclinic).put(updateclinic).delete(deleteclinic);

module.exports=router;