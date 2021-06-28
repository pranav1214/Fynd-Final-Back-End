require( './data/init' );

const express = require( 'express' );

const cors = require( 'cors' );

const authRouter = require( './routes/auth' );

const productRouter = require( './routes/products' );

const { pageNotFoundHandler, errorHandler } = require( './middleware/errorHandler' );

const app = express();

app.use( cors() );

app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

app.use( '/auth', authRouter );

app.use( '/product', productRouter );

app.use( pageNotFoundHandler );
app.use( errorHandler );

const PORT = process.env.PORT || 3000;

app.listen( PORT, error => {
    if( error ){
        return console.error( error.message );
    }
    console.log( `Server running on ${PORT}` )
} );