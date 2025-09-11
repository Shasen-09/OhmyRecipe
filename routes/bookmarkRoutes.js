const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/userMiddleware');
const { getBookmarks, addBookmark, removeBookmark } = require('../controller/bookmarkController');

router.get("/", userMiddleware, getBookmarks);
router.post("/", userMiddleware, addBookmark);
router.delete("/:id", userMiddleware, removeBookmark);

module.exports = router;
