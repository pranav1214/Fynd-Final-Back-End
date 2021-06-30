const jwt = require( 'jsonwebtoken' );

const { JWT_SECRET_KEY } = process.env;

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );

    if( !token ){
        const error = new Error( 'Go away stranger' );
        error.status = 401;
        return next( error );
    }

    jwt.verify( token, JWT_SECRET_KEY, ( err, claims ) => {
        if( err ){
            const error = new Error( 'Go away stranger' );
            error.status = 403;
            return next( error );
        }
        //If authenticated store claims data to be used in middleware
        res.locals.claims = claims;
        next();
    } );
};

function authorize( role ){
    return function( req, res, next ){
        const claims = res.locals.claims;

        if( claims.role !== role ){
            const error = new Error( 'You are not authorized' );
            error.status = 403;
            return next( error );
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
}