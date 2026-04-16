const book = require('../models/book');

// Create a book 
exports.createBook = async (req, res) => {
  try {
    const {title, isbn, authors, status} = req.body;

    if (!title || isbn) {
      return res.status(400).json({ message: 'Title and ISBN are required' });
    }

    const newBook = new book({
      title, 
      isbn,
      authors,
      status,
    });

    await newBook.save();

    res.status(201).json({message: 'Book created successfully', book:newBook
    })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: error.message})
  }}


  // Get all books
  exports.getAllBooks = async (req, res) => {
    try {
      const books = await book.find().populate('authors', 'name');

      res.status(200).json({books})
    }
    catch (error){
      console.error(error);
      res.status(500).json({message: error.message})
    }
  };


  //Get a book by id 
  exports.getBookById = async (req, res) => {
    try {
      const book = await book.findById(req.params.id).populate('authors', 'name')

      if (!book) {
        return res.status(404).json({message: 'Book not found'})
      }

      res.status(200).json({ book });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({message: error.message})
    }
  };


  //Update a book
  exports.updateBook = async (req, res) => {
    try {
         const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateBook) {
      return res.status(404).json({ message: 'Book not found'});
    }

    res.status(201).json({message:'Book updated successfully', 
      book: updateBook,
    });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message })
    }
  };

  //Delete Book 
  exports.deleteBook = async (req, res) => {
    try {
      const  deletedBook = await book.findByIdAndDelete(req.params.id);

      if (!deletedBook){
        return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200),json({ message:'Book deleted successfully'});
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Return Book 
  exports.returnBook = async (req, res ) => {
    try {
      const book = await Book.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      book.status = 'IN';
      book.borrowedBy = null;
      book.issuedBy = null;
      book.issueDate = null;
      book.returnDate = null;

    await book.save();

    res.status(200).json({
      message: 'Book returned successfully', book,
    });
    }
    catch (error) {
      res.status(500).json({message: error.message });
    }
  };







// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const {studentId, attendantId, returnedDate } = req. body;

    const book = await book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({message: 'Book not found'})
    }

    if (book.status === 'OUT') {
      return res.status(400).json({message: 'Book is already out'})
    }

    book.status = 'OUT';
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.issuedDate = new Date();
    book.returnDate = returnedDate;

    await book.save();

    res.status(200).json({message: 'Book borrowed successfully', book})

  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
  {

  }
};