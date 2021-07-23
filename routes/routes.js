const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');
const AdminAuth = require('../middleware/AdminAuth');

router.get('/', HomeController.index);

router.put('/user', UserController.edit);
router.get('/user', AdminAuth, UserController.index);
router.post('/user', UserController.create);
router.put('/user', AdminAuth, UserController.edit);
router.get('/user/:id', UserController.findUser);
router.delete('/user/:id', UserController.delete);
router.post('/changepassword/:token/:uuid', UserController.changePassword);
router.post('/user/recovery', UserController.recoveryPassword);
router.post('/login', UserController.login);
module.exports = router;
