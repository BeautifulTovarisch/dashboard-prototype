'use strict';

const bookshelf = require( '../config/bookshelf-config' );

module.exports = bookshelf.Model.extend({
    tableName: 'user'
});
