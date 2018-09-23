'use strict';

const test = require( 'ava' );
const express = require( 'express' );
const request = require( 'supertest' );
const { json } = require( 'body-parser' );

const Mou = require( './mou.model' );
const routes = require( './mou.route' );

const end_date = new Date();
const start_date = new Date( '04/15/2027' );

test.beforeEach( t => {
    t.context.app = express()
        .use( json() )
        .use( routes );
});

test( '/GET', async t => {
    const { app } = t.context;

    await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client A",
        value: 600000
    }).save();
    
    await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client B",
        value: 250000
    }).save();

    const { status, body } = await request( app ).get( '/' );

    t.is( status, 200 );
    t.is( body.length >= 2, true );
    t.truthy( body[0].task_orders );
    
});

test( '/GET/:id', async t => {
    const { app } = t.context;
    
    const mou = await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Test Client",
        value: 5000000
    }).save();

    const { status, body } = await request( app )
          .get( `/id/${ mou.get( 'id' ) }` );

    t.is( status, 200 );
    t.is( body.client_name, 'Test Client' );
    t.is( body.value, 5000000 );
    t.truthy( body.task_orders );

});

test( '/GET/clients', async t => {
    const { app } = t.context;

    await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client A",
        value: 600000
    }).save();
    
    await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client B",
        value: 250000
    }).save();

    await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client C",
        value: 250000
    }).save();

    const { status, body } = await request( app ).get( '/clients' );

    t.is( status, 200 );
    t.true( body.length >= 3 );
    t.falsy( body[0].value ); // Return only client name
    t.truthy( body[0].client_name );
    
});

test( '/PUT', async t => {
    const { app } = t.context;

    const { attributes } = await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client A",
        value: 250000
    }).save();

    const payload = {
        id: attributes.id,
        client_name: 'Client B',
        value: 2500000
    };

    const { status, body } = await request( app ).put( '/' ).send( payload );

    t.is( status, 200 );
    t.is( body.client_name, 'Client B' );
    t.is( body.value, 2500000 );
    
});

test( '/POST', async t => {
    const { app } = t.context;

    const payload = {
        start_date: start_date,
        end_date: end_date,
        client_name: "Client A",
        value: 575000
    };

    const { status, body } = await request( app ).post( '/' ).send( payload );

    t.is( status, 200 );
    t.is( body.client_name, "Client A" );
    t.is( body.value, 575000 );

});

test( '/DELETE', async t => {
    const { app } = t.context;
    const { attributes } = await new Mou({
        start_date: start_date,
        end_date: end_date,
        client_name: "Client A",
        value: 12
    }).save();
    
    const { status } = await request( app ).delete( '/' )
          .send( { id: attributes.id } );

    const deleted = await new Mou({ id: attributes.id }).fetch();

    t.is( status, 200 );
    t.is( deleted, null );

});

test.after.always( 'cleanup', async t => {
    await new Mou().where({ start_date: start_date }).destroy();
});
