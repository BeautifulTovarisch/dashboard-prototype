'use strict';

const test = require( 'ava' );
const express = require( 'express' );
const request = require( 'supertest' );
const { json } = require( 'body-parser' );

const Mou = require( '../Mou/mou.model' );

const routes = require( './task-order.route' );
const TaskOrder = require( './task-order.model' );

const end_date = new Date();
const start_date = new Date( '05/26/2019' );

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
        client_name: 'Test-Client-A'
    }).save();

    await new TaskOrder({
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'Task A',
        task_description: 'Perform Task A',
        start_date: start_date,
        end_date: end_date
    }).save();

    await new TaskOrder({
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'Task B',
        task_description: 'Perform Task B',
        start_date: start_date,
        end_date: end_date
    }).save();

    const { status, body } = await request( app ).get( '/' );

    t.is( status, 200 );
    t.is( body.length >= 2, true );
    t.truthy( body[0].invoices );

});

test( '/PUT', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        value: 100000,
        end_date: end_date,
        start_date: start_date,
        client_name: 'Test-Client-B'
    }).save();

    const taskOrder = await new TaskOrder({
        mou_id: attributes.id,
        budget: 0,
        overhead_rate: 0.00,
        task_name: '',
        task_description: '',
        start_date: start_date,
        end_date: end_date
    }).save();

    const payload = {
        id: taskOrder.attributes.id,
        budget: 75000,
        overhead_rate: 35.73,
        task_name: 'Test Task',
        task_description: 'Testing'
    };

    const { status, body } = await request( app ).put( '/' ).send( payload );

    t.is( status, 200 );
    t.is( body.budget, 75000 );
    t.is( body.overhead_rate, 35.73 );
    t.is( body.task_name, 'Test Task' );
    t.is( body.task_description, 'Testing' );

});

test( '/POST', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        value: 100000,
        end_date: end_date,
        start_date: start_date,
        client_name: 'MPA'
    }).save();

    const payload = {
        mou_id: attributes.id,
        budget: 25000,
        overhead_rate: 26.73,
        task_name: 'PM Sign Collection',
        task_description: 'Take pictures',
        start_date: start_date,
        end_date: end_date
    };

    const { status, body } = await request( app ).post( '/' ).send( payload );

    t.is( status, 200 );
    t.is( body.budget, 25000 );
    t.is( body.mou_id, attributes.id );
    t.is( body.task_name, 'PM Sign Collection' );
    t.is( body.task_description, 'Take pictures' );

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
        budget: 0,
        overhead_rate: 0.00,
        task_name: '',
        task_description: '',
        start_date: start_date,
        end_date: end_date
    }).save();

    const { status } = await request( app )
          .delete( '/' ).send({ id: taskOrder.attributes.id });

    const deleted = await new TaskOrder({ id: taskOrder.attributes.id }).fetch();

    t.is( status, 200 );
    t.is( deleted, null );
    
});

test.after.always( 'cleanup', async t => {
    await new Mou()
        .where({ start_date: start_date })
        .destroy();
});
