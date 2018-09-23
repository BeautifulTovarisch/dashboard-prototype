'use strict';

import React from 'react';

import { formatCurrency } from '../utilities';

export class CompanyTable extends React.Component {
    render() {
        const { companies } = this.props;
        return (
            <div className='table-responsive'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th className='text-right'>Yearly Revenue</th>
                    <th className='text-right'>Employees</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      companies.map( function( c ) {
                          return (
                              <tr key={ c.id }>
                                <td>{ c.company_name }</td>
                                <td className='text-right'>
                                  { formatCurrency( c.yearly_revenue ) }
                                </td>
                                <td className='text-right'>
                                  { c.num_employees.toLocaleString() }
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

CompanyTable.defaultProps = {
    companies: []
};

export default CompanyTable;
