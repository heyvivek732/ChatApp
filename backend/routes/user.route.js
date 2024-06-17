const express= require("express");
const  {protectRoute}  = require("../midlware/protectRoute");
const { getAllUsers, getOneUser } = require("../controller/users.controller");

const router=express.Router();


router.get('/',protectRoute,getAllUsers);
router.get('/:id',protectRoute,getOneUser);

module.exports=router;