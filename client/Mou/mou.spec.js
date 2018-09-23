'use strict';

import test from 'ava';

import {
    toXY,
    sumStartups,
    sumLicenses,
    activeCompanies
} from './mou.dal';

test( 'sumStartups', t => {
    const mous = [
        { num_startups: 230 },
        { num_startups: 1500 },
        { num_startups: 500 }
    ];

    t.is( sumLicenses( [] ), 0 );
    t.is( sumStartups( mous ), 2230 );
});

test( 'sumLicenses', t => {
    const mous = [
        { num_licenses: 1250 },
        { num_licenses: 130 },
        { num_licenses: 275 },
    ];

    t.is( sumLicenses( [] ), 0 );
    t.is( sumLicenses( mous ), 1655 );
});

test( 'activeCompanies', t => {
    const companies = [
        { active: false },
        { active: false },
        { active: true },
        { active: false },
        { active: true },
        { active: false }
    ];

    t.deepEqual( activeCompanies( [] ), {} );
    t.deepEqual( activeCompanies( companies ), { "true": 2, "false": 4 });

});

test( 'toXY', t => {
    const obj = {
        a: 10,
        b: 20,
        c: 30
    };


    const expected = [
        {
            "xValue": "a",
            "yValue": 10
        },
        {
            "xValue": "b",
            "yValue": 20
        },
        {
            "xValue": "c",
            "yValue": 30
        }
    ];
    
    t.deepEqual( toXY( {} ), [] );
    t.deepEqual( toXY( obj ), expected );

});
