'use strict';

const bookshelf = require( '../config/bookshelf-config' );

const Invoice = require( '../Invoice/invoice.model' );

module.exports = bookshelf.Model.extend({
    tableName: 'task_order',
    invoices: function() { return this.hasMany( Invoice ); }
});
