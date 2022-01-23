const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const addListController = require('../controllers/add_list_controller');
const deleteListController = require('../controllers/delete_list_controller');

console.log('router loaded');


router.get('/', homeController.home);        // Simply fetching home page
router.post('/create-list', passport.checkAuthentication, addListController.add_list);         // Route to create a list
router.post('/delete-list', passport.checkAuthentication, deleteListController.delete_list);    // Route to delete a list

router.use('/users', require('./users'));


module.exports = router;