'use strict';

import React from 'react';

import { keys } from 'lodash';

import {
    formatDate,
    formatCurrency,
    formatPercentage
} from '../utilities';

import { Link } from 'react-router-dom';

export class MouTable extends React.Component {
    render() {
        const { mous } = this.props;
        return (
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th className='text-right'>Value</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                  {
                    keys( mous ).map( function( client, i ) {
                        return (
                            <tbody key={ i }>
                              <tr>
                                <td>{ client }</td>
                              </tr>
                              {
                                  mous[client].map( function( mou ) {
                                      return (
                                          <tr key={ mou.id }>
                                            <td className='text-right'>
                                              <Link to={`/mou/${ mou.id }`}>
                                                Details
                                              </Link>
                                            </td>
                                            <td className='text-right'>
                                              { formatCurrency( mou.value ) }
                                            </td>
                                            <td>
                                              { formatDate( mou.start_date ) }
                                            </td>
                                            <td>
                                              { formatDate( mou.end_date ) }
                                            </td>
                                          </tr>
                                      );
                                  })
                              }
                            </tbody>
                        );
                      })
                  }
              </table>
            </div>
        );
    }
}

MouTable.defaultProps = {
    mous: []
};

export default MouTable;
