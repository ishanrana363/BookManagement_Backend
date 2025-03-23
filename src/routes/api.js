const express = require("express");
const { uploadBook, allBook, updateBook, singleBook, deleteBook } = require("../controllers/bookController");

const router = express.Router();

router.post("/book-upload", uploadBook);
router.get("/all-book", allBook);
router.get("/single-book/:id", singleBook);
router.put("/update-book/:id", updateBook);
router.delete("/delete-book/:id", deleteBook);





module.exports = router;