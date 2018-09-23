'use strict';

import { get } from 'axios';

export const getMous = () => get( '/api/mou' );

import {
    sumBy,
    reduce,
    countBy
} from 'lodash/fp';

export const sumValues = sumBy( 'value' );

export const valueByClient = reduce( ( acc, { client_name, value } ) => {
    acc[ client_name ] = acc[ client_name ]
        ? acc[ client_name ] + value
        : value;
    return acc;
}, {});

export const countByClientType = countBy( 'client_type' );
