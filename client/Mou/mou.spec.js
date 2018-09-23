'use strict';

import test from 'ava';

import {
    budgetAllocated
} from './mou.dal';

test( 'budgetAllocated', t => {
    const taskOrders = [
        { budget: 20 },
        { budget: 40 },
        { budget: 10 },
        { budget: 20 },
        { budget: 10 }
    ];

    t.is( budgetAllocated( [] ), 0 );
    t.is( budgetAllocated( taskOrders ), 100 );
    
});

// test( 'toXY', t => {
//     const obj = {
//         a: 10,
//         b: 20,
//         c: 30
//     };


//     const expected = [
//         {
//             "xValue": "a",
//             "yValue": 10
//         },
//         {
//             "xValue": "b",
//             "yValue": 20
//         },
//         {
//             "xValue": "c",
//             "yValue": 30
//         }
//     ];
    
//     t.deepEqual( toXY( {} ), [] );
//     t.deepEqual( toXY( obj ), expected );

// });
