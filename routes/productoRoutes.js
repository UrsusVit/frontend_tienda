const {Router}=require("express")
const router=Router();
const multer=require('multer');
const path=require('path');
const productoController=require('../controllers/productoController')
const ventaController=require('../controllers/ventaController')

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

router.post('/crearProducto', upload.single('imagen'), productoController.crearProducto);
router.get('/obtenerProducto', productoController.obtenerProducto);
router.get('/obtenerProductoId/:id', productoController.obtenerProductoId);
router.delete('/eliminarProductoId/:id', productoController.eliminarProductoId);
router.put('/actualizarProductoId/:id', upload.single('imagen'), productoController.actualizarProductoId);
router.get('/verImagenId/:id', productoController.verImagenId);
router.post('/crearVenta', ventaController.crearVenta);

module.exports=router;