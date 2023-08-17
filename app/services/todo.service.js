const Item = require('../models/item.model');
const List = require('../models/list.model');

const getAllItems = async () => Item.find({});

const insertDefaultItems = async () => Item.insertMany(defaultItems);

const addNewItem = async (newItem) => {
  const item = new Item({ name: newItem });
  return item.save();
};

const addNewItemToList = async (listName, newItem) => {
  const foundedList = await List.findOne({ name: listName });
  foundedList.items.push(new Item({ name: newItem }));
  return foundedList.save();
};

const deleteItemFromList = async (listName, itemId) => {
  let response;
  if (listName === 'Today') {
    response = await Item.findByIdAndDelete(itemId);
  } else {
    response = await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: itemId } } }
    );
  }
  return response;
};

const findListByName = async (listName) => List.findOne({ name: listName });

const createCustomList = async (customListName) => {
  const list = new List({
    name: customListName,
    items: defaultItems,
  });
  return list.save();
};

const deleteItem = async (itemId) => Item.findByIdAndDelete(itemId);

const createListWithDefaultItems = async (listName) => {
  const newList = new List({
    name: listName,
    items: [],
  });

  return newList.save();
};

module.exports = {
  getAllItems,
  insertDefaultItems,
  addNewItem,
  addNewItemToList,
  deleteItemFromList,
  findListByName,
  createCustomList,
  deleteItem,
  createListWithDefaultItems,
};
