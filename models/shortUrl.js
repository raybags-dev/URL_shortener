const mongoose = require('mongoose');
const validateor = require('validator');
const shortID = require('shortid');


const shortUrlSchema = new mongoose.Schema({
   full: {
      type: String,
      required: true,
      validate: (value) => {
         if (!validateor.isURL(value)) return "wo..wo..wait, invalid URL. try again"
      }
   },
   short: {
      type: String,
      required: true,
      default: shortID.generate

   },
   clicks: {
      type: Number,
      require: true,
      default: 0
   }
});

module.exports = mongoose.model('shortUrl', shortUrlSchema);