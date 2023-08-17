const Joi = require('joi');
const { objectId } = require('../validations/custom.validation');

const addNewItem = {
  body: Joi.object().keys({
    newItem: Joi.string().trim().required().max(50),
    list: Joi.string().required(),
  }),
};

const deleteItem = {
  body: Joi.object().keys({
    checkbox: Joi.string().custom(objectId).required(),
    itemListName: Joi.string().required(),
  }),
};

const getCustomList = {
  params: Joi.object().keys({
    customListname: Joi.string().required(),
  }),
};

module.exports = {
  addNewItem,
  deleteItem,
  getCustomList,
};
