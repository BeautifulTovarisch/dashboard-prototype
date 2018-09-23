'use strict';

const router = require( 'express' ).Router();
const { assign } = require( 'lodash' );
const { hash, verify } = require( 'argon2' );

const logger = require( '../config/log-util' );

const User = require( './user.model' );

router.post( '/login', async( req, res ) => {

    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status( 400 )
                .send({ message: "Invalid Parameters" });
        }

        const user = await new User({ email: email }).fetch();

        if( !user ) {
            return res.status( 404 )
                .send({ message: "Invalid Email" });
        }

        const verified = await verify( user.get( 'password' ), password );

        return verified
            ? res.end()
            : res.status( 401 )
            .send({ message: "Invalid Password" });

    } catch ( e ) {

        logger.error( e.message );

        return res.status( 500 )
            .send({ message: "Error authenticating user" });
    }

});

router.post( '/signup', async( req, res ) => {
    try {

        // Don't want them passing in ID, remove from payload
        const { id, ...payload } = req.body;

        // TODO :: validate email, password with middleware

        const userData = assign( {}, payload, {
            password: await hash( payload.password )
        });

        const user = await new User( userData ).save();

        return res.json( user.id );

    } catch( e ) {
        logger.error( e.message );

        return res.status( 500 )
            .send({ message: "Error registering user" });
    }
});

module.exports = router;
