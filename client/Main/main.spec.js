'use strict';

import test from 'ava';

import {
    sumValues,
    valueByClient,
    countByClientType
} from './main.dal';

test( 'sumValues', t => {
    const mous = [
        { value: 1200 },
        { value: 2500 },
        { value: 250 },
        { value: 1000 }
    ];

    t.is( sumValues( [] ), 0 );
    t.is( sumValues( mous ), 4950 );
});

test( 'valueByClient', t => {
    const mous = [
        { client_name: 'A', value: 100 },
        { client_name: 'A', value: 250 },
        { client_name: 'B', value: 200 },
        { client_name: 'C', value: 225 }
    ];

    t.deepEqual( valueByClient( [] ), {} );
    t.deepEqual( valueByClient( mous ), { "A": 350, "B": 200, "C": 225 } );
});

test( 'countByClientType', t => {
    const mous = [
        { client_type: 'A' },
        { client_type: 'A' },
        { client_type: 'A' },
        { client_type: 'B' },
        { client_type: 'B' },
        { client_type: 'C' }
    ];

    t.deepEqual( countByClientType( [] ), {} );
    t.deepEqual( countByClientType( mous ), {
        'A': 3,
        'B': 2,
        'C': 1
    });
});
