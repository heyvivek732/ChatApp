const express =require('express');
const router =express.Router();

const {sendMessage, getMessage} = require("../controller/message.controller");
const { protectRoute } = require('../midlware/protectRoute');

router.get('/:id',protectRoute,getMessage);
router.post('/send/:id',protectRoute,sendMessage);

module.exports=router;