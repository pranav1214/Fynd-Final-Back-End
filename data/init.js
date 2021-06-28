const mongoose = require( 'mongoose' );

require( '../models/user' );

require( '../models/products' );

const uri = 'mongodb://localhost:27017/groceryDB';

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );

mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on( 'open', () => {
    console.log( 'Connection to database successful' );
} );

mongoose.connection.on( 'error', () => {
    console.log( err.message );
    process.exit( 1 );
} );