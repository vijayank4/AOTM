const User = require('../models/User');
const sqlstring = require('sqlstring');
const Decrypt = require('../models/Decrypt');
const Encrypt = require('../models/Encrypt');
const fs = require('fs');
const path = require('path');

class UserController {
    getUserRoleDetails(req, res) {
        try {
            const decryptedData = Decrypt.getDecrypt(req.body);
            const requestData = JSON.parse(decryptedData);
            const userDataArr = User.getUserData(sqlstring.escape(requestData.login_id));
            const userRoleArr = User.getUserRoleFeature(sqlstring.escape(requestData.role_id),sqlstring.escape(requestData.project_id));
            const userMenuArr = User.getUserRoleMenuList(sqlstring.escape(requestData.role_id),sqlstring.escape(requestData.project_id));
            req.session.user_list = userDataArr;
            req.session.router_list = userRoleArr;
            req.session.menu_list = userMenuArr;
            res.status(200).json(Encrypt.getEncrypt(JSON.stringify({result:req.session, message: "Success"})));
        } catch (error) {
            //console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getUserList(req, res) {
        try {
            const limitCount = process.env.NODE_APP_PAGINATION_COUNT;
            const decryptedData = Decrypt.getDecrypt(req.body);
            const requestData = JSON.parse(decryptedData);
            
            const pageoffset = requestData.startPage === 0 ? 0 : parseInt(requestData.startPage * limitCount);
            const searchText = requestData.searchText;
            const userCount = User.getTotalUserCount(searchText);
            const userListArr = User.getAllUserList(pageoffset,limitCount,searchText);
            const roundedUp = Math.ceil(userCount/limitCount);
            req.session.users = userListArr;
            req.session.pagecount = roundedUp;
            res.status(200).json(Encrypt.getEncrypt(JSON.stringify({result:req.session, message: "Success"})));
        } catch (error) {
            //console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getLocation(req, res) {
        try {
            const locationArr = User.getAllLocation();
            res.status(200).json(Encrypt.getEncrypt(JSON.stringify({result:locationArr, message: "Success"})));
        } catch (error) {
            //console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    getRoles(req, res) {
        try {
            const rolesArr = User.getAllRoles();
            res.status(200).json(Encrypt.getEncrypt(JSON.stringify({result:rolesArr, message: "Success"})));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    createUser (req, res) {
        try {
            console.log(req.body)
            const result = User.createUser(req.body, req.file);
            const { file } = req;
            if(file)
            {
                const uploadDir = path.join(__dirname, '..', '../client/public/images/profilepic');
                const filePath = path.join(uploadDir, req.body.empid + path.extname(file.originalname));
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir);
                }
                fs.writeFileSync(filePath, file.buffer);
            }
            res.status(200).json(Encrypt.getEncrypt(result));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    updateUser (req, res) {
        try {
            console.log(req.body)
            const result = User.updateUser(req.body, req.file);
            const { file } = req;
            if(file)
            {
                const uploadDir = path.join(__dirname, '..', '../client/public/images/profilepic');
                const filePath = path.join(uploadDir, req.body.empid + path.extname(file.originalname));
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir);
                }
                fs.writeFileSync(filePath, file.buffer);
            }
            res.status(200).json(Encrypt.getEncrypt(result));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    deleteUser(req, res) {
        try {
            const decryptedData = Decrypt.getDecrypt(req.body);
            const requestData = JSON.parse(decryptedData);
            const result = User.deleteUser(requestData);
            res.status(200).json(Encrypt.getEncrypt(result));
        } catch (error) {
            //console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController();