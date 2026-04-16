const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {type: string, required: true},

  isbn: {type: string, unique: true},

  // relationship (i.e one book can have many authors, or two or more book can be written by the same author)
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author'
  }
], 

  status: {type: string, 
    enum: ['IN', 'OUT'], 
    default: 'IN'

},

borrowedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'student'},

issuedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'attendant'},

returnDate: {type: Date, default: null}, 

issuedDate: {type: Date, default: null}

}, 

{timestamps: true});

module.exports = mongoose.model('book', bookSchema);
