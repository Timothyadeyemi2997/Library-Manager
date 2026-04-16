const book = require('../models/author');

// Create a author 
exports.createAuthor = async (req, res) => {
  try {
    const {name, bio} = req.body;

    if (!name ) {
      return res.status(400).json({ message: 'Author name is required' });
    }

    const newAuthor = new Author({
      name, 
      bio,
    });

    await newAuthor.save();

    res.status(201).json({message: 'Author created successfully', book:newAuthor
    })
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }}


  // Get all authors
  exports.getAllAuthors = async (req, res) => {
    try {
      const authors = await author.find()

      res.status(200).json({ authors });
    }
    catch (error){
      res.status(500).json({message: error.message})
    }
  };


  //Get a Author by id 
  exports.getAuthorById = async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);

      if (!author) {
        return res.status(404).json({message: 'Author not found'})
      }

      res.status(200).json({ author });
    }
    catch (error) {
      res.status(500).json({message: error.message})
    }
  };


  //Update a author by ID
  exports.updateAuthor = async (req, res) => {
    try {
         const updateAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateAuthor) {
      return res.status(404).json({ message: 'Author not found'});
    }

    res.status(201).json({message:'Author updated successfully', 
      author: updateAuthor,
    });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message })
    }
  };

  //Delete Author
  exports.deleteAuthor = async (req, res) => {
    try {
      const  deletedAuthor = await book.findByIdAndDelete(req.params.id);

      if (!deletedAuthor){
        return res.status(404).json({ message: 'Author not found' });
      }

      res.status(200),json({ message:'Author deleted successfully'});
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };