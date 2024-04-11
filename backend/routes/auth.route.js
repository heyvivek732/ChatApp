const express=require("express");
const router =express.Router();

const {loginController,singnUpController,logOutController} =require('../controller/auth.controller');
router.post('/login',loginController)
router.post('/signup',singnUpController);
router.get('/logout',logOutController);

module.exports=router;