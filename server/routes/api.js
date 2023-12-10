const express = require('express');
const multer = require('multer');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const MenuController = require('../controllers/MenuController');
const EncryptController = require('../controllers/EncryptController');
const UserController = require('../controllers/UserController');
const storage = multer.memoryStorage(); // You can adjust storage options as needed
const upload = multer({ storage: storage });

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/get_user_role_details', UserController.getUserRoleDetails);
router.post('/imgencrypt', EncryptController.getImgEncrypt);
router.post('/get_user_list', UserController.getUserList);
router.get('/get_location', UserController.getLocation);
router.get('/get_roles', UserController.getRoles);
router.post('/create_user',upload.single('uploadimage'), UserController.createUser);
router.post('/update_user',upload.single('uploadimage'), UserController.updateUser);
router.post('/delete_user', UserController.deleteUser);

module.exports = router;