const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
