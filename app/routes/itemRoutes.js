// represents the router class
const express = require('express');
const {
  getAllItems,
  getItem,
  getItemDelete,
  saveItem,
  updateItem,
  deleteItem,
} = require('../controller/itemController');

const router = express.Router();

router.get('/items', getAllItems);

// http://localhost:3005/api/profile/id
router.get('/item/:id', getItem);

// http://localhost:3005/api/profile
/*
{
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
    "phone": "{{$randomPhoneNumber}}"
}
*/
router.post('/item', saveItem);

// http://localhost:3005/api/profile/id
/*
{
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
    "phone": "{{$randomPhoneNumber}}"
}
*/
router.put('/item/:id', updateItem);

// http://localhost:3005/api/profile/id
router.delete('/item/:id', deleteItem);

module.exports = {
  routes: router,
};
