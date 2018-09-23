'use strict';

const bookshelf = require( '../config/bookshelf-config' );

const TaskOrder = require( '../TaskOrder/task-order.model' );

module.exports = bookshelf.Model.extend({
    tableName: 'mou',
    task_orders: function() { return this.hasMany( TaskOrder ); }
});
