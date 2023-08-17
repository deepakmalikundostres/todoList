const { json } = require('express');
const todoService = require('../services/todo.service');
const httpStatus = require("http-status");


const getTodayList = async (req, res) => {

    const items = await todoService.getAllItems();
    res.status(httpStatus.OK).send({ code: httpStatus.OK, message: "success", data: items });
};




const addNewItem = async (req, res) => {
   const { newItem, list } = req.body;
    // Find or create the list based on its name
   
    // Add the new item to the list
    let response;
    if (list === 'Today') {
      response = await todoService.addNewItem(newItem);
    } else {
      const foundedList = await todoService.findListByName(list);
      if (!foundedList) await todoService.createListWithDefaultItems(list);
      response = await todoService.addNewItemToList(list, newItem);  
     }
    res.status(httpStatus.OK).send({ code: httpStatus.OK, message: "success", data: response });
  
};

const deleteItem = async (req, res) => {
  const { checkbox, itemListName } = req.body;
    if (itemListName === 'Today') {
      await todoService.deleteItem(checkbox);
    } else {
      await todoService.deleteItemFromList(itemListName, checkbox);
    }
    
    res.status(httpStatus.OK).send({ code: httpStatus.OK, message: "success" });
 
};


const  getCustomList = async (req, res) => {
    const customListName = req.params.customListname;
    const result = await todoService.findListByName(customListName);
    res.status(httpStatus.OK).send({ code: httpStatus.OK, message: "success", data: result ? result.items : [] });
};

module.exports = {
   getTodayList,
   addNewItem,
   deleteItem,
   getCustomList
};
