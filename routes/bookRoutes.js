const express = require('express');
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require('../controller/bookController');

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

// Special actions
router.put('/borrow/:id', borrowBook);
router.put('/return/:id', returnBook);

module.exports = router;