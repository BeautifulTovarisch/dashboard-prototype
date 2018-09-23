'use strict';

import React from "react";

import {
    max
} from 'd3';

import Bar       from '../tejas/Bar/bar.jsx';
import Axis      from '../tejas/Axis/axis.jsx';
import Container from '../tejas/Container/container.jsx';

import {
    calcBarX,
    calcBarWidth,
    calcBarHeight
} from '../tejas/Bar/bar.calc';

import {
    createLinearValueMap,
} from '../tejas/calc.js';

const XAxis = props => {
    const length = props.width;
    const barWidth = calcBarWidth( props.width - props.marginLeft, props.data.length, props.spacer );

    const xLabelTransform      = ( length, i ) =>
          `translate(${ length + ( length * i ) - ( length / 2 ) }, ${ 20 } )`;

    const xLabelGroupTransform = props =>
          `translate( ${ props.marginLeft }, ${ props.height + props.marginTop - 5 } )`;

    const xAxisLabelTransform  = props =>
          `translate( ${ ( props.width - props.marginLeft ) / 2 }, ${ props.marginBottom - props.marginTop} )`;

    return (
        <g transform={ xLabelGroupTransform( props ) }>
          <text
            textAnchor='middle'
            transform={ xAxisLabelTransform( props ) }>
            { props.label }
          </text>
          <Axis
            axis='x'
            data={ props.data }
            label='Contract Title'
            length={ props.width - props.marginLeft }
            dataKey='contractTitle'
            rotate={ props.rotate }
            fontSize = { 13 }/>
        </g>
    );
};

// TODO :: Customise the spacing of the yAxis label
const YAxis = props => {
    const yAxisGroupTransform = props =>
          `translate( ${ props.marginLeft }, ${ props.marginTop } )`;

    const yAxisLabelTransform = props =>
          `translate( ${ ( 25 - props.marginLeft ) }, ${ props.height / 2 } ) rotate( -90 )`;

    return (
        <g transform={ yAxisGroupTransform( props ) } >
          <text
            textAnchor='middle'
            transform={ yAxisLabelTransform( props ) } >
            { props.label }
          </text>
          <Axis
            axis='y'
            data={ props.data }
            ticks={ props.ticks }
            length={ props.height }
            tickSize={ -props.width }
            dataKey='yValue' />
        </g>
    );
};

const Bars = props => {
    const range    = [ 0, max( props.data, d => d.yValue ) ];
    const barWidth = calcBarWidth( props.width - props.marginLeft, props.data.length, props.spacer );
    const valueMap = createLinearValueMap( props.height, range, 'yValue' );

    const barGroupTransform  = props =>
          `translate( ${ props.marginLeft }, ${ props.marginTop } )`;

    const barYValueTransform = ( props, d, i ) =>
          `translate( ${ calcBarX( barWidth, i, props.spacer ) }, ${ valueMap( d ) } )`;

    return (
        <g transform={ barGroupTransform( props ) } >
        {
            props.data.map( ( d, i ) =>
                <g key={ i } >
                  <Bar
                    x={ calcBarX( barWidth, i, props.spacer ) }
                    y={ valueMap( d ) }
                    fill={ props.barFill }
                    width={ barWidth }
                    height={ calcBarHeight( props.height, valueMap( d ) ) } />
                </g>
            )
        }
        </g>
    );
};

export class BarChart extends React.Component {
    render() {
        const props = this.props;
        return props.data && props.data.length
            ? (
                <Container
                  height={ props.height }
                  marginRight={ props.marginRight }
                  marginBottom={ props.marginBottom } >

                  <YAxis
                    data={ props.data }
                    label={ props.yLabel }
                    ticks={ props.ticks }
                    marginTop={ props.marginTop || 0 }
                    marginLeft={ props.marginLeft || 0 } />

                  <XAxis
                    data={ props.data }
                    label={ props.xLabel }
                    rotate={ "-45" }
                    marginTop={ props.marginTop || 0 }
                    marginLeft={ props.marginLeft || 0 }
                    marginBottom={ props.marginBottom  || 0} />

                  <Bars
                    data={ props.data }
                    spacer={ props.barSpacer || 5 }
                    barFill={ props.barFill }
                    marginTop={ props.marginTop || 0 }
                    marginLeft={ ( props.marginLeft + 10 ) || 0 } />

                </Container>
            )
        : null;
    }
}

export default BarChart;
