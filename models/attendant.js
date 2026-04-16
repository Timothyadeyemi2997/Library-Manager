const mongoose = require('mongoose');

const attendantSchema = new mongoose.Schema({
  name: {type: string, required: true},
  staffId: {type: string, unique: true},
  issuedBooks [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Book',
    }
  ]

},

{timestamps: true});

module.exports = mongoose.model('attendant', attendantSchema);


