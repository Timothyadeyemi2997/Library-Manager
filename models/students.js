const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {type: string, required: true},
  email: {type: string, required: true},
  studentId: {type: string, unique: true},
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    }
  ]
},
{timestamps: true});

module.exports = mongoose.model('student', studentSchema);


