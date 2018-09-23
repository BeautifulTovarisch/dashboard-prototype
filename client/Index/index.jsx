'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from '../NavBar/nav-bar.jsx';
import Routes from '../Routes/routes.jsx';
import SidePanel from '../SidePanel/side-panel.jsx';

class App extends React.Component {
    render() {
        return (
            <div id="wrapper" className='h-100'>
              <Router>
                <React.Fragment>
                  <Navbar />
                  <div className='container-fluid'>
                    <div className='row'>
                      <SidePanel />
                      <Routes />
                    </div>
                  </div>
                </React.Fragment>
              </Router>
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById( 'react-mount-point' )
);

export default App;
