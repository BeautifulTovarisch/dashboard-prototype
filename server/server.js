'use strict';

const express    = require( 'express' );

const app            = express();
const path           = require( 'path' );
const morgan         = require( 'morgan' );
const bodyParser     = require( 'body-parser' );
const methodOverride = require( 'method-override' );

const logger = require( path.resolve( __dirname, 'config/log-util' ) );

const APP_PORT = process.env.PORT     || 2305;
const APP_HOST = process.env.HOST     || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

const mouRoutes = require( path.resolve( 'Mou/mou.route' ) );
const invoiceRoutes = require( path.resolve( 'Invoice/invoice.route' ) );
const taskOrderRoutes = require( path.resolve( 'TaskOrder/task-order.route' ) );

/////////////// MiddleWares ///////////////

app.use( morgan( 'dev' ) );
app.use( methodOverride() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { "extended": true } ) );

/////////////// Routes ///////////////

app.use( '/api/mou', mouRoutes );
app.use( '/api/invoice', invoiceRoutes );
app.use( '/api/task-order', taskOrderRoutes );

if ( app.get( 'env' ) === 'development' ) {
    app.use( ( err, req, res, next ) => {
        err && logger.error( err );
        return err ? res.status( err.status || 500 ).end() : next();
    });
}

app.listen( APP_PORT, APP_HOST, () => {
    logger.info( `App Started at ${ APP_HOST }:${ APP_PORT }` );
});
