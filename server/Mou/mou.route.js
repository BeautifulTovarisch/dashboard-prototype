const path = require('path');
const router = require('express').Router();

const logger = require( '../config/log-util' );

const Mou = require( './mou.model' );

const { development } = require( '../knexfile' );
const knex = require( 'knex' )( development );

router.get('/', async( req, res ) => {
    try {

        const mous = await Mou.fetchAll({
            withRelated: [ 'task_orders' ]
        });

        return res.json( mous );

    } catch( e ) {

        logger.error( e.message || e );

        return res.status( 500 )
            .send({ message: "Error fetching mous" });
    }
});

router.get( '/clients', async( req, res ) => {
    try {
        const clients = await knex( 'mou' )
              .select( 'client_name' )
              .groupBy( 'client_name' );

        return res.json( clients );
    } catch( e ) {
        logger.error( e.message );
        return res.status( 500 )
            .send({ message: "Error fetching clients" });
    }
});

router.put('/', async( req, res ) => {
    try {

        const { id, ...data } = req.body;

        const mou = await new Mou({ id: id }).save( data );

        return res.json( mou );

    } catch( e ) {

        logger.error( e.message || e );
        return res.status( 500 )
            .send({ message: "Error editing Mou" });
    }
});

router.post('/', async( req, res ) => {
    try {
        const { id, ...data } = req.body;

        const mou = await new Mou().save( data );

        return res.json( mou );
    } catch( e ) {
        logger.error( e.message || e );
        return res.status( 500 )
            .send({ message: "Error creating mou" });
    }
});

router.delete('/', async( req, res ) => {
    try {
        const { id } = req.body;

        await new Mou({ id: id }).destroy();

        return res.end();
    } catch( e ) {
        logger.error( e.message || e );
        return res.status( 500 )
            .send({ message: "Error deleting mou" });
    }
});

module.exports = router;
