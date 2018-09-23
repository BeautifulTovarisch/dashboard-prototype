'use strict';

import { get } from 'axios';

import {
    sumBy
} from 'lodash/fp';

export const getMou = id =>
    get( `/api/mou/id/${ id }` );

const sumMouBy = key => mous =>
      mous.reduce( ( acc, next ) => acc + next[ key ], 0 );

export const budgetAllocated = sumBy( 'budget' );
