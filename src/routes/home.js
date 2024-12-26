const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/books/:code', bookController.getBookByCode);
router.get('/search', bookController.searchBooks);

module.exports = router;
