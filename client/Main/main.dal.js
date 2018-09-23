'use strict';

import { get } from 'axios';

export const getMous = () => get( '/api/mou' );

export const sumValues = mous =>
    mous.reduce( ( acc, { value } ) => acc + value, 0 );

export const valueByClient = mous =>
    mous.reduce( ( acc, { client_name, value } ) => {
        acc[ client_name ] = acc[ client_name ]
            ? acc[ client_name ] + value
            : value;
        return acc;
    }, {});

export const countByClientType = mous =>
    mous.reduce( ( acc, { client_type } ) => {
        acc[ client_type ] = acc[ client_type ]
            ? acc[ client_type ] + 1
            : 1;
        return acc;
    }, {});
