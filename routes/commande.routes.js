const express = require('express')
const router = express.Router()
const commandeController = require('../controllers/commande.controller');
const productController = require('../controllers/product.controller');

const app = express();




router.post('/', commandeController.insertcommande);//
router.get('/allcommande/', commandeController.getallcommande);//
router.get('/allcommandeCilent/:id', commandeController.allcommandeCilent);//
router.get('/commandeDetails/:id', commandeController.getcommandeDetails);//
router.get('/findOneclient/:id', commandeController.findOneclient);//



module.exports = router