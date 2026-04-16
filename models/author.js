const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {type: string, required: true},
  bio: {type: string, required: true},
  dob: {type: Date}
},
{timestamps: true});

module.exports = mongoose.model('author', authorSchema);


