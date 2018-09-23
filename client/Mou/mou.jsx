'use strict';

import React from 'react';

import {
    getMou,
    budgetAllocated
} from './mou.dal';

import Card from '../Card/card.jsx';
import Modal from '../Modal/modal.jsx';

import BarChart from '../BarChart/bar-chart.jsx';
import Progress from '../Progress/progress.jsx';
import DonutChart from '../DonutChart/donut-chart.jsx';
import TaskOrderTable from '../TaskOrder/task-order-table.jsx';

import EditMouForm from '../Mou/mou-edit.jsx';

import { formatDate, formatCurrency } from '../utilities';

export class Mou extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            mou: {
                task_orders: []
            }
        };
    }

    async componentDidMount() {
        try {
            const { id } = this.props.match.params;
            const { data } = await getMou( id );

            this.setState({ mou: data });

        } catch( e ) {
            this.setState( { error: e } );
        }
    }

    async componentDidUpdate( { match } ) {
        const { id } = this.props.match.params;
        if( id && ( id !== match.params.id ) ) {
            try {
                const { data } = await getMou( id );
                this.setState({ mou: data });
            } catch( e ) {
                this.setState({ error: e });
            }
        }
    }

    render() {
        const { mou } = this.state;
        return (
            <div className='col-md mt-2'>
              <div className='row mb-3'>
                <div className='col-md'>
                  <h2>
                    { mou.mou_name }
                  </h2>
                  <button className='btn btn-outline-success float-right ml-1'>
                    Add Task Order
                  </button>
                  <Modal
                    title="Edit MOU"
                    triggerText="Edit MOU"
                    buttonClass="btn btn-outline-info float-right" >
                    <EditMouForm />
                  </Modal>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-md'>
                  <Card className='h-100'>
                    <h4 className='card-title'>
                      MOU Information
                    </h4>
                    <hr />
                    <ul className='list-unstyled'>
                      <li>
                        <span className='text-muted'>Client</span>
                        <p>{ mou.client_name }</p>
                      </li>
                      <li>
                        <span className='text-muted'>Value</span>
                        <p>{ formatCurrency( mou.value ) }</p>
                      </li>
                      <li>
                        <span className='text-muted'>Start Date</span>
                        <p>{ formatDate( mou.start_date ) }</p>
                      </li>
                      <li>
                        <span className='text-muted'>End Date</span>
                        <p>{ formatDate( mou.end_date ) }</p>
                      </li>
                    </ul>
                  </Card>
                </div>
                <div className='col-md'>
                  <Card
                    footer={ () =>
                             <Progress
                                   percent={
                                       ( ( budgetAllocated( mou.task_orders )
                                           / mou.value ) * 100 )

                                   } />
                             }
                    centered
                    className='h-100' >
                    <h4 className='card-title'>
                      Budget Allocated
                    </h4>
                    <h1 className='card-text text-center'>
                      { formatCurrency( budgetAllocated( mou.task_orders ) ) }
                    </h1>

                  </Card>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-md'>
                  <Card className='h-100'>
                    <h4 className='cart-title'>
                      Example Donut Chart
                    </h4>
                    <DonutChart
                      data={ [
                          { "yValue": 10 },
                          { "yValue": 25 },
                          { "yValue": 50 },
                          { "yValue": 5 },
                          { "yValue": 250 }
                      ] }
                      height={ 250 }
                      padAngle={ 0.015 }
                      innerRadius={ 100 }
                      outerRadius={ 75 } />
                    <p className='card-text text-right'>Hover for Details</p>
                  </Card>
                </div>
                <div className='col-md'>
                  <Card className='h-100'>
                    <h4 className='card-title'>Placeholder</h4>
                  </Card>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-md'>
                  <Card className='h-100'>
                    <h4 className='card-title'>Revenue by Company</h4>
                    <BarChart
                      data={ [] }
                      height={ 325 }
                      yLabel="Revenue ($)"
                      marginTop={ 15 }
                      marginLeft={ 100 }
                      marginBottom={ 175 } />
                  </Card>
                </div>
              </div>
              <div className='row'>
                <div className='col-md'>
                  <Card>
                    <h4 className='card-title'>Companies</h4>
                    <TaskOrderTable companies={ mou.companies }/>
                  </Card>
                </div>
              </div>
            </div>
        );
    }
}

export default Mou;
