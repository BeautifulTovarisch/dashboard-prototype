'use strict';

const { development } = require( '../knexfile' );

const knex = require( 'knex' )( development );
const bookshelf = require( 'bookshelf' )( knex );

module.exports = bookshelf;
