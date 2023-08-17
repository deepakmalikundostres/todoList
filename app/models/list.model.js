const mongoose = require('mongoose');
const itemSchema = require('../models/item.model').schema;

const listSchema = new mongoose.Schema(
  {
    name: String,
    items: [itemSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const List = mongoose.model('List', listSchema);

module.exports = List;
