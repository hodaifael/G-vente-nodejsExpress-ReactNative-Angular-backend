const express = require('express')
const router = express.Router()
const associationController = require('../controllers/associationController')
const projectController = require('../controllers/projectController')


// association access
router.post('/login', associationController.loginAsso)
// create project
router.post('/addproject/:id', projectController.createProject)

router.get('/assosiationProject/:id', associationController.assosiationProject)

router.get('/assosiationdonation/:id', associationController.assosiationdonation)

module.exports = router