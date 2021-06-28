const express = require( 'express' );

const { addProduct, updateProduct, removeProduct, getProduct, getProductById } = require( '../controllers/products' );

const { authenticate, authorize } = require( '../middleware/auth' );

const router = express.Router();

router.post( '/', authenticate, authorize( 'admin' ), addProduct );

router.patch( '/:id', authenticate, authorize( 'admin' ), updateProduct );

router.delete( '/:id', authenticate, authorize( 'admin' ), removeProduct );

router.get( '/', getProduct );

router.get( '/:id', getProductById );

module.exports = router;