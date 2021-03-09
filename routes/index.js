const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const addListController = require('../controllers/add_list_controller');
const deleteListController = require('../controllers/delete_list_controller');

console.log('router loaded');


router.get('/', homeController.home);        // Simply fetching home page
router.post('/create-list', addListController.add_list);         // Route to create a list
router.post('/delete-list', deleteListController.delete_list);    // Route to delete a list


module.exports = router;