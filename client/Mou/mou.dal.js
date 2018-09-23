'use strict';

import { get } from 'axios';

import { keys } from 'lodash';

export const getMou = id =>
    get( `/api/mou/${ id }` );

const sumMouBy = key => mous =>
      mous.reduce( ( acc, next ) => acc + next[ key ], 0 );

export const activeCompanies = companies =>
    companies.reduce( ( acc, next ) => {
        acc[ next.active ] = acc[ next.active ] + 1 || 1;
        return acc;
    }, {});

export const revenueByCompany = companies =>
    companies.map( c => ({
        "xValue": c.company_name,
        "yValue": c.yearly_revenue
    }));

export const toXY = obj => keys( obj ).map( key => ({
    "xValue": key,
    "yValue": obj[ key ]
}));

export const sumStartups = sumMouBy( 'num_startups' );
export const sumLicenses = sumMouBy( 'num_licenses' );
