'use strict';

import { get } from 'axios';

export const getMous = () => get( '/api/mou' );

import {
    sumBy,
    countBy,
    groupBy
} from 'lodash/fp';

export const sumValues = sumBy( 'value' );
export const groupByClient = groupBy( 'client_name' );
export const valueByClient = mous =>
    mous.reduce( ( acc, { client_name, value } ) => {
        acc[ client_name ] = acc[ client_name ]
            ? acc[ client_name ] + value
            : value;
        return acc;
    }, {});

export const countByClientType = countBy( 'client_type' );
