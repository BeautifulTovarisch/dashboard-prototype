'use strict';

import React from 'react';

import Card from '../Card/card.jsx';

export class Login extends React.Component {
    constructor() {
        super();
        this._handleLogin = this._handleLogin.bind( this );
        this._handleInputChange = this._handleInputChange.bind( this );
    }
    _handleLogin( e ) {

    }
    _handleInputChange( e ) {
        const { id, value } = e.target;

        this.setState({
            [id]: value
        });

    }
    render() {
        return (
            <div className='col-md mt-5'>
              <Card>
                <form id='login-form'>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='text' className='form-control' required />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' className='form-control' required />
                  </div>
                  <div className='form-group'>
                    <button type='submit' className='btn btn-outline-primary float-right'>Login</button>
                  </div>
                </form>
              </Card>
            </div>
        );
    }
}
