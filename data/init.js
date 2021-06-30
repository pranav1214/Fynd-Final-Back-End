const mongoose = require( 'mongoose' );

mongoose.set( 'useFindAndModify', false );
mongoose.set( 'returnOriginal', false );

require( '../models/user' );

require( '../models/products' );

const { NODE_ENV, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


const connectionStr = NODE_ENV === 'development' ? `mongodb://${DB_HOST}/${DB_NAME}` : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;


console.log( `Connecting to database ${DB_NAME}` );

mongoose.connect( connectionStr, {
     useNewUrlParser: true, 
     useUnifiedTopology: true 
    } );

mongoose.connection.on( 'open', () => {
    console.log( `Connection to database ${DB_NAME} successful` );
} );

mongoose.connection.on( 'error', () => {
    console.log( `Connection to database ${DB_NAME} was unsuccessful` );
    process.exit( 1 );
} );