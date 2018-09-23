'use strict';

const test = require( 'ava' );
const express = require( 'express' );
const request = require( 'supertest' );

const { json } = require( 'body-parser' );

const routes = require( './invoice.route' );

const Mou = require( '../Mou/mou.model' );
const Invoice = require( './invoice.model' );
const TaskOrder = require( '../TaskOrder/task-order.model' );

const end_date = new Date();
const start_date = new Date( '09/07/2013' );

test.beforeEach( t => {
    t.context.app = express()
        .use( json() )
        .use( routes );
});

test( '/GET', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        value: 100000,
        end_date: end_date,
        start_date: start_date,
        client_name: 'MPA'
    }).save();

    const taskOrder = await new TaskOrder({
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'PM Dashboard',
        task_description: 'Build PM Dashboard',
        start_date: start_date,
        end_date: end_date
    }).save();

    await new Invoice({
        task_order_id: taskOrder.attributes.id,
        start_date: start_date,
        end_date: end_date,
        invoice_amount: 5000,
        paid: false
    }).save();

    await new Invoice({
        task_order_id: taskOrder.attributes.id,
        start_date: start_date,
        end_date: end_date,
        invoice_amount: 7200,
        paid: true
    }).save();

    const { status, body } = await request( app ).get( '/' );

    t.is( status, 200 );
    t.is( body.length >= 2, true );

});

test( '/PUT', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        value: 100000,
        end_date: end_date,
        start_date: start_date,
        client_name: 'MPA'
    }).save();

    const taskOrder = await new TaskOrder({
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'PM Dashboard',
        task_description: 'Build PM Dashboard',
        start_date: start_date,
        end_date: end_date
    }).save();

    const invoice = await new Invoice({
        task_order_id: taskOrder.attributes.id,
        start_date: start_date,
        end_date: end_date,
        invoice_amount: 5000,
        paid: false
    }).save();

    const payload = {
        id: invoice.attributes.id,
        paid: true ,
        invoice_amount: 50000
    };

    const { status, body } = await request( app ).put( '/' ).send( payload );

    t.is( status, 200 );
    t.is( body.paid, true );
    t.is( body.invoice_amount, 50000 );

});

test( '/POST', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        value: 100000,
        end_date: end_date,
        start_date: start_date,
        client_name: 'MPA'
    }).save();

    const taskOrder = await new TaskOrder({
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'PM Dashboard',
        task_description: 'Build PM Dashboard',
        start_date: start_date,
        end_date: end_date
    }).save();

    const payload = {
        task_order_id: taskOrder.attributes.id,
        start_date: start_date,
        end_date: end_date,
        invoice_amount: 2500,
        paid: false
    };

    const { status, body } = await request( app ).post( '/' ).send( payload );

    t.is( status, 200 );
    t.is( body.invoice_amount, 2500 );
    t.is( body.paid, false );

});

test( '/DELETE', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        value: 100000,
        end_date: end_date,
        start_date: start_date,
        client_name: 'MPA'
    }).save();

    const taskOrder = await new TaskOrder({
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'PM Dashboard',
        task_description: 'Build PM Dashboard',
        start_date: start_date,
        end_date: end_date
    }).save();

    const invoice = await new Invoice({
        task_order_id: taskOrder.attributes.id,
        start_date: start_date,
        end_date: end_date,
        invoice_amount: 5000,
        paid: false
    }).save();

    const { status } = await request( app )
          .delete( '/' ).send({ id: invoice.attributes.id });

    const deleted = await new Invoice({ id: invoice.attributes.id }).fetch();

    t.is( status, 200 );
    t.is( deleted, null );
    
});

test.after.always( 'cleanup', async t => {
    await new Mou()
        .where({ start_date: start_date })
        .destroy();
});
