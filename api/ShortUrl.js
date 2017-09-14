const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  url: String,
  key: String,
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
