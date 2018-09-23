'use strict';

const path = require('path');
const router = require('express').Router();

const logger = require( '../config/log-util' );

const TaskOrder = require( './task-order.model' );

router.get( '/', async( req, res ) => {
    try {
        const taskOrders = await TaskOrder.fetchAll({
            withRelated: [ 'invoices' ]
        });

        return res.json( taskOrders );

    } catch( e ) {

        logger.error( e.message || e );
        return res.status( 500 ).send({ message: "Error fetching Task Orders" });

    }
});

router.put( '/',  async( req, res ) => {
    try {
        const { id, ...data } = req.body;

        const to = await new TaskOrder({ id: id }).save( data );

        return res.json( to );

    } catch( e ) {
        logger.error( e.message || e );

        return res.status( 500 ).send({ message: "Error updating Task" });
    }
});

router.post('/', async( req, res ) => {
    const { id, ...data } = req.body;

    try {

        const task = await new TaskOrder().save( data );

        return res.json( task );

    } catch( e ) {
        logger.error( e.message || e );
        return res.status( 500 ).send( { message: "Error creating task order" });
    }
});

router.delete('/', async( req, res ) => {
    try {
        const { id } = req.body;

        await new TaskOrder({ id: id }).destroy();

        return res.end();

    } catch( e ) {
        logger.log( e.message || e );
        return res.status( 500 ).send( { message: "Error deleting task" } );
    }
});

module.exports = router;
