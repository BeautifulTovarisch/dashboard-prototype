'use strict';

import React from 'react';

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
                    <th>Mou</th>
                    <th className='text-right'>Client</th>
                    <th className='text-right'>Value</th>
                    <th className='text-right'>Start Date</th>
                    <th className='text-right'>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      mous.map( function( mou ) {
                          return (
                              <tr key={ mou.id }>
                                <td>
                                  <Link to={`/mou/${ mou.id }`}>
                                    Details
                                  </Link>
                                </td>
                                <td className='text-right'>
                                  { mou.client_name }
                                </td>
                                <td className='text-right'>
                                  { formatCurrency( mou.value ) }
                                </td>
                                <td className='text-right'>
                                  { formatDate( mou.start_date ) }
                                </td>
                                <td className='text-right'>
                                  { formatDate( mou.end_date ) }
                                </td>
                              </tr>
                          );
                      })
                  }
                </tbody>
              </table>
            </div>
        );
    }
}

MouTable.defaultProps = {
    mous: []
};

export default MouTable;
