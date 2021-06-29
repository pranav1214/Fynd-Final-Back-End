const mongoose = require( 'mongoose' );

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );

require( '../models/user' );

require( '../models/products' );

const DB_HOST = 'localhost';
const DB_NAME = 'groceryDB';

const connectionStr = `mongodb://${DB_HOST}/${DB_NAME}`;


console.log( `Connecting to database ${DB_NAME}` );

mongoose.connect( connectionStr, {
     useNewUrlParser: true, 
     useUnifiedTopology: true 
    } );

mongoose.connection.on( 'open', () => {
    console.log( `Connection to database ${DB_NAME} successful ` );
} );

mongoose.connection.on( 'error', () => {
    console.log( err.message );
    process.exit( 1 );
} );