const express = require( 'express' );

const { addProduct, updateProduct, removeProduct, getProduct, getProductById } = require( '../controllers/products' );

const { authenticate, authorize } = require( '../middleware/auth' );

const multer = require( 'multer' );

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage });

const router = express.Router();

router.post( '/', authenticate, authorize( 'admin' ), upload.single( 'image' ), addProduct );

router.patch( '/:id', authenticate, authorize( 'admin' ), updateProduct );

router.delete( '/:id', authenticate, authorize( 'admin' ), removeProduct );

router.get( '/', getProduct );

router.get( '/:id', getProductById );

module.exports = router;