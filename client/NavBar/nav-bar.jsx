'use strict';

import React from 'react';

import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light flex-md-nowrap">
              <Link className="navbar-brand" to="/">Dashboard</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                  </li>
                </ul>
              </div>
              <button className='btn btn-outline-info'>Login</button>
            </nav>
        );
    }
}

export default Navbar;
