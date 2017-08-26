const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  url: String,
  key: Number,
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
