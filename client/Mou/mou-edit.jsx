'use strict';

import React from 'react';

export class EditMouForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            errors: {}
        };

        this._handleEditMou = this._handleEditMou.bind( this );
        this._handleInputChange = this._handleInputChange.bind( this );
    }

    _handleInputChange( { id, value } ) {
        // TODO :: handle input validation
        this.setState({
            [id]: value
        });
    }

    _handleEditMou( e ) {
        e.preventDefault();
    }

    render() {
        return (
            <form id='edit-mou' onSubmit={ this._handleEditMou }>
              <div className='form-group'>
                <label htmlFor='num_licenses'>Number of Licenses</label>
                <input id='num_licenses' className='form-control' type='number' required />
              </div>
              <div className='form-group'>
                <label htmlFor='num_startups'>Number of Startups</label>
                <input id='num_startups' className='form-control' type='number' required />
              </div>
              <div className='form-group'>
                <label htmlFor='num_disclosures'>Number of Disclosures</label>
                <input id='num_disclosures' className='form-control' type='number' required />
              </div>
              <div className='form-group'>
                <label htmlFor='hours_mentoring'>Mentoring Hours</label>
                <input id='hours_mentoring' className='form-control' type='number' required />
              </div>
              <div className='form-group'></div>
              <div className='form-group'></div>
              <div className='form-group'></div>
            </form>
        );
    }
}

export default EditMouForm;
