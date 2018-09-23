'use strict';

const path = require('path');
const router = require('express').Router();

const logger = require( '../config/log-util' );

const Invoice = require( './invoice.model' );

router.get('/', async( req, res ) => {
    try {
        const invoices = await Invoice.fetchAll();

        return res.json( invoices );

    } catch( e ) {
        logger.error( e.message || e );
        return res.status( 500 )
            .send({ message: "Error fetching invoices" });
    }
});

router.put('/', async( req, res ) => {
    try {
        const { id, ...data } = req.body;

        const invoice = await new Invoice({ id: id }).save( data );

        return res.json( invoice );

    } catch( e ) {

        logger.error( e.message || e );

        return res.status( 500 )
            .send({ message: "Error editing invoice" });
    }
});

router.post('/', async( req, res ) => {
    try {
        const { id, ...data } = req.body;

        const invoice = await new Invoice().save( data );

        return res.json( invoice );
    } catch( e ) {
        logger.error( e.message || e );
        return res.status( 500 )
            .send({ message: "Error creating invoice" });
    }
});

router.delete('/', async( req, res ) => {
    try {
        const { id } = req.body;
        
        await new Invoice({ id: id }).destroy();
        
        return res.end();

    } catch( e ) {
        logger.error( e.message || e );
        return res.status( 500 )
            .send({ message: "Error deleting invoice" });
    }
});

module.exports = router;
