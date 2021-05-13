const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/add', userController.addUser);
router.get('/findAll', userController.findAll);
router.get('/findById/:id', userController.findById);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.deleteById);

module.exports = router;
