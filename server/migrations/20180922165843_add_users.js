'use strict';

exports.up = async( knex, Promise ) => {
    await knex.schema.createTable( 'user', t => {
        t.increments( 'id' ).unsigned().primary();

        t.string( 'email', 50 ).notNull();
        t.string( 'password' ).notNull();
        t.string( 'last_name', 100 ).notNull();
        t.string( 'first_name', 100 ).notNull();

        t.unique( 'email' );

        t.dateTime( 'account_created' ).default( knex.fn.now() );
        t.dateTime( 'account_updated' ).default( knex.fn.now() );
    });
};

exports.down = async( knex, Promise ) => {
  // Don't allow user table to be dropped
};
