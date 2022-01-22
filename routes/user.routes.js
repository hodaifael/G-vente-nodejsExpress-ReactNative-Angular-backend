const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');



//login web
router.post('/auth', userController.login);

//registre web
router.post('/', userController.registre);

router.post('/login', userController.loginUser);
router.post('/update', userController.update);
//donate to a project 
router.put('/donate/:idUser/:idProject', userController.donateToProject)
//show valid projects
router.get('/projects', userController.showProjets)

module.exports = router