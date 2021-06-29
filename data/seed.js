const { execSync } = require( 'child_process' );

const DB_NAME = 'groceryDB';

try{
    execSync( `mongoimport --db ${DB_NAME} --collection users --drop --file "${process.cwd()}/data/seed/users.json" --jsonArray` );
    console.log( `Imported data in the db ${DB_NAME}` );
}catch( err ){
    console.log( `Import failed in db ${DB_NAME}` );
    console.log( err );
}