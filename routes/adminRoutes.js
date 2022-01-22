const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

//admin loging
router.post('/login', adminController.loginAdmin)
//project validation
router.put('/validate/:id', adminController.validateProjet)
//project updating
router.put('/update/:id', adminController.updateProjet)
//show invalid projects
router.get('/projects', adminController.showProjets)

module.exports = router