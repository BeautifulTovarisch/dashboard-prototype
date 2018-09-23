'use strict';

import React from 'react';

import { Route } from 'react-router-dom';

import Main from '../Main/main.jsx';
import Mou from '../Mou/mou.jsx';
import { Login } from '../Authenticate/authenticate.jsx';

export class Routes extends React.Component {
    render() {
        return (
            <React.Fragment>
              <Route exact path='/' component={ Main }/>
              <Route exact path='/login' component={ Login } />
              <Route exact path='/mou/:id' component={ Mou } />
            </React.Fragment>
        );
    }
}

export default Routes;
