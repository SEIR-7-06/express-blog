const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: { type: String, required: true },
  article: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  ]
}, {timestamps: true});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
