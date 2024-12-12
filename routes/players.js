const express = require("express");
const router = express.Router();
const {getPlayers, createPlayers, updatePlayers, deletePlayers, addLink, getLinks} = require("../controllers/player.js")
const upload = require('../middlewares/uploadImg.js');
const cloudinary = require('../middlewares/cloudinaryService.js'); 
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads



router.route("/").get( getPlayers); 
// router.route("/add").post(upload.single('Image'), createPlayers);
router.route("/add").post(upload.single('Image'), createPlayers);
router.route("/update/:id").put(upload.single('Image'), updatePlayers);
router.route("/delete/:id").delete(deletePlayers);
router.route("/addlink/:id").put(addLink);
router.route("/getlinks/:id").get(getLinks);

module.exports = router