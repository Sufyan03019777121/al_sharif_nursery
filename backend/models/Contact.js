// models/Contact.js
const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contacts', contacstSchema);
