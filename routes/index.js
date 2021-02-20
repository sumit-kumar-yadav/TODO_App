const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const addListController = require('../controllers/add_list_controller')

console.log('router loaded');


router.get('/', homeController.home);
router.post('/create-list', addListController.add_list);


module.exports = router;