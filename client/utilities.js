'use strict';

export const formatDate = dateString =>
    new Date( dateString ).toLocaleDateString();

export const formatCurrency = ( dollars=0 ) =>
    `$${ Math.round( dollars ).toLocaleString() }`;

export const formatPercentage = ratio => `${ Math.floor( ratio * 100 ) }%`;

export const toXY = obj =>
    Object.keys( obj ).map( key => ({
        "xValue": key,
        "yValue": obj[ key ]
    }) );
