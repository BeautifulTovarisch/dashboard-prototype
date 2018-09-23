'use strict';

import { get } from 'axios';

export const fetchClients = () =>
    get( '/api/mou/clients' );
