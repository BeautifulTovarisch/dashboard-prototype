'use strict';

const test = require( 'ava' );
const express = require( 'express' );
const request = require( 'supertest' );
const { json } = require( 'body-parser' );
const { hash, verify } = require( 'argon2' );

const User = require( './user.model' );
const routes = require( './authenticate.route' );

test.beforeEach( t => {
    t.context.app = express()
        .use( json() )
        .use( routes );
});

test( 't', async t => {
    const { app } = t.context;

    const user = await new User({
        email: 'test@email.com',
        password: await hash( 'Super Secret Password' ),
        last_name: 'Testington',
        first_name: 'Test'
    }).save();

    const payload = {
        email: 'test@email.com',
        password: 'Super Secret Password'
    };

    const { status } = await request( app )
          .post( '/login' )
          .send( payload );

    t.is( status, 200 );
});

test( '/signup', async t => {
    const { app } = t.context;

    const payload = {
        email: 'test@test-email.com',
        password: 'Super Secret Password',
        last_name: 'Testington',
        first_name: 'Test'
    };

    const { status, body } = await request( app )
          .post( '/signup' )
          .send( payload );

    const { attributes } = await new User({ id: body }).fetch();

    t.is( status, 200 );
    t.is( attributes.email, 'test@test-email.com' );
    t.not( attributes.password, 'Super Secret Password' );
    t.true( await verify( attributes.password, 'Super Secret Password' ) );

});

test.after.always( 'cleanup', async t => {
    await new User()
        .where({ email: 'test@email.com' })
        .destroy();

    await new User()
        .where({ email: 'test@test-email.com' })
        .destroy();
});
