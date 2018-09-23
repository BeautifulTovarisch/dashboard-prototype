'use strict';

import React from 'react';

import Card from '../Card/card.jsx';

import BarChart from '../BarChart/bar-chart.jsx';
import DonutChart from '../DonutChart/donut-chart.jsx';

import {
    getMous,
    sumValues,
    groupByClient,
    valueByClient,
    countByClientType
} from './main.dal';

import { toXY, formatCurrency, formatPercentage } from '../utilities';

import MouTable from '../Mou/mou-table.jsx';

export class Main extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            mous: []
        };
    }
    async componentDidMount() {
        try {
            const mous = await getMous();
            this.setState({
                mous: mous.data
            });
        } catch( e ) {
            this.setState({ error: e });
        }
    }
    render() {
        const { mous } = this.state;
        return (
            <main className='col-md-10 col-sm-12 mt-2'>
              <div className='row mb-3'>
                <div className='col-md'>
                  <Card className='h-100' header='MOU value by client'>
                    <BarChart
                      data={ toXY( valueByClient( mous ) ) }
                      height={ 250 }
                      marginTop={ 15 }
                      marginLeft={ 75 }
                      marginBottom={ 65 } />
                  </Card>
                </div>
                <div className='col-md'>
                  <Card className='h-100' centered>
                    <h2 className='card-title text-center'>
                      { mous.length }
                    </h2>
                    <p className='card-text text-center'>MOUs</p>
                  </Card>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-md'>
                  <Card className='h-100' header='Client breakdown'>
                    <DonutChart
                      data={ toXY( countByClientType( mous ) ) }
                      height={ 250 }
                      innerRadius={ 100 }
                      outerRadius={ 75 } />
                    <p className='card-text float-right'>Hover for details</p>
                  </Card>
                </div>
                <div className='col-md'>
                  <Card className='h-100' centered>
                    <h2 className='card-title'>Total Value</h2>
                    <h4 className='card-text text-right'>
                      { formatCurrency( sumValues( mous ) ) }
                    </h4>
                  </Card>
                </div>
              </div>
              <div className='row'>
                <div className='col-md'>
                  <Card className='h-100' header='MOU details'>
                    <MouTable mous={ groupByClient( mous ) } />
                  </Card>
                </div>
              </div>
            </main>
        );
    }
}

export default Main;
