const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  url: String,
  key: String,
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
