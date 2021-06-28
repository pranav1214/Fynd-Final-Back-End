const mongoose = require( 'mongoose' );

const Products = mongoose.model( 'Products' );


const addProduct = ( req, res, next ) => {
    const newProduct = req.body;

    if( !newProduct ){
        const error = new Error( 'Product details missiing' );
        error.status = 400;
        return next( error );
    }

    Products.create( newProduct )
        .then( insertedProduct => {
            res.status( 201 ).json( insertedProduct );
        } )
        .catch( err => {
            console.log( JSON.stringify( err, null, 4 ) );

            if( err.name === 'ValidationError' ){
                err.status = 400;
            }else{
                err.status = 500;
            }
            return next( err );
        } );
};

const updateProduct = ( req, res, next ) => {
    const id = req.params.id;
    const patchProduct = req.body;

    if( !patchProduct ){
        const error = new Error( 'Product details missiing' );
        error.status = 400;
        return next( error );
    }

    Products.findByIdAndUpdate( id, patchProduct, { runValidators: true } )
        .then( updatedProduct => res.json( updateProduct ) )
        .catch( err => {
           console.log( JSON.stringify( err, null, 4 ) );
           
           if( err.name === 'ValidationError' ){
               err.status = 400;
           }else{
               err.status = 500;
           }
           return next( err );
        } )
}

const removeProduct = ( req, res, next ) => {
    const id = req.params.id;

    Products.findByIdAndDelete( id )
        .then( () => res.status( 204 ).send() )
        .catch( err => {
            err.status = 500;
            return next( err );
        } )
};

const getProduct = ( req, res, next ) => {
    Products.find( {} )
    .select( { name: 1, description: 1, category: 1, price: 1, imageUrl: 1 } )
    .then( result => {
        res.status( 200 ).json( result )
    } )
    .catch( err => {
        if( err.name === 'ValidationError' ){
            err.status = 400;
        }else{
            err.status = 500;
        }
        return next( err );
    } );
};

const getProductById = ( req, res, next ) => {
    const id = req.params.id;
    
    Products.findById( id )
     .select( { name: 1, description: 1, category: 1, price: 1, imageUrl: 1 } )
     .then( result => {
        res.status( 200 ).json( result )
    } )
     .catch( err => {
         err.status = 500;
         return next( err );
     } );
 };

module.exports = {
    addProduct,
    updateProduct,
    removeProduct,
    getProduct,
    getProductById
}