require( 'dotenv' ).config();

require( './data/init' );

const path = require( 'path' );

const express = require( 'express' );

const cors = require( 'cors' );

const authRouter = require( './routes/auth' );

const productRouter = require( './routes/products' );

const { pageNotFoundHandler, errorHandler } = require( './middleware/errorHandler' );

const app = express();

if( process.env.NODE_ENV === 'development' ){
    app.use( cors() );
}

app.use( express.static( path.join( process.cwd(), 'public' ) ) );

app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

app.use( '/api/auth', authRouter );

app.use( '/api/product', productRouter );

app.use( '/api', pageNotFoundHandler );
app.use( '/api', errorHandler );

app.use( function (req, res, next){
    res.sendFile( path.join( process.cwd(), 'public', 'index.html' ) );
} )

const PORT = process.env.PORT || 3000;

app.listen( PORT, error => {
    if( error ){
        return console.error( error.message );
    }
    console.log( `Server running on ${PORT}` )
} );