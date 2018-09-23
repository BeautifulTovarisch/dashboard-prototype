'use strict';

exports.up = async( knex, Promise ) => {

    await knex.schema.createTable( 'mou', t => {
        t.increments( 'id' ).unsigned().primary();

        t.integer( 'value' ).notNull();

        t.date( 'end_date' ).notNull();
        t.date( 'start_date' ).notNull();

        t.string( 'client_name' ).notNull();
        t.enum( 'client_type', [
            'State', 'Federal', 'Municipal', 'Private', 'Other'
        ]);

    });

    await knex.schema.createTable( 'task_order', t => {
        t.increments( 'id' ).unsigned().primary();

        t.integer( 'mou_id' ).unsigned().notNull();
        t.integer( 'budget' ).notNull();

        t.float( 'overhead_rate' ).notNull();

        t.string( 'task_name' ).notNull();
        t.string( 'contact_name' );
        t.string( 'contact_email' );
        t.string( 'contact_phone' );
        t.string( 'sub_contractor' );
        t.string( 'project_manager' );
        t.string( 'task_description' ).notNull();

        t.date( 'end_date' ).notNull();
        t.date( 'start_date' ).notNull();

        t.enum( 'billing_structure', [ 'Fixed', 'Time and Materials' ] );

        t.foreign( 'mou_id' )
            .references( 'id' ).inTable( 'mou' )
            .onDelete( 'CASCADE' );
    });

    await knex.schema.createTable( 'invoice', t => {
        t.increments( 'id' ).unsigned().primary();

        t.integer( 'task_order_id' ).unsigned().notNull();

        t.date( 'end_date' ).notNull();
        t.date( 'start_date' ).notNull();

        t.integer( 'invoice_amount' ).notNull();

        t.boolean( 'paid' ).notNull();

        t.foreign( 'task_order_id' )
            .references( 'id' ).inTable( 'task_order' )
            .onDelete( 'CASCADE' );
    });

};

exports.down = async( knex, Promise ) => {
    await knex.schema.dropTable( 'invoice' );
    await knex.schema.dropTable( 'task_order' );
    await knex.schema.dropTable( 'mou' );

};
