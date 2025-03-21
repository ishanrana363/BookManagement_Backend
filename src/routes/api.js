const express = require("express");
const { uploadBook } = require("../controllers/bookController");

const router = express.Router();

router.post("/book-upload", uploadBook )





module.exports = router;