const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller');
const app = express();

const multer = require('multer');
app.use(express.static(__dirname + '/uploads'));// Setup server port

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })






router.post('/', productController.create);//
router.post('/cartct/phone/', productController.createcarctphone);//

router.get('/enattend/', productController.findAllenattend);//

router.get('/refuser/', productController.findAllrefuser);//

router.get('/stock/:id', productController.getstock);

router.get('/:id', productController.findById);//

router.post('/stock/', productController.findByIdFromstock);//



router.post('/caract/', productController.findcaractById);//




router.get('/client/offre/:id', productController.findAllByIdoffre);//
router.get('/client/enattend/:id', productController.findAllByIdenattend);//
router.get('/client/refuser/:id', productController.findAllByIdrefuser);//
router.get('/client/contre/:id', productController.findAllByIdcontre);//

router.get('/client/accepte/:id', productController.accepteClient);//


router.post('/admin/valide/', productController.valideadmin);//

router.get('/admin/refuser/:id', productController.refuseradmin);//

router.post('/admin/contreoffre/', productController.contreoffre);//

router.post('/admin/changeprix/', productController.changeprix);//

router.delete('/:id', productController.delete);//


router.post('/multipleFiles/:id', upload.array('files'), productController.addMultipleimage)


router.get('/type/:id', productController.getproductBytype);//

router.put('/allcaractiristique', productController.allcaractiristique);//

router.get('/chiffreproduct/:id', productController.chiffreproduct);//

router.get('/chiffrecommande/:id', productController.chiffrecommande);//






module.exports = router