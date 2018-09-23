'use strict';

import React from 'react';
import styled from 'styled-components';

import Arc from '../tejas/Arc/arc.jsx';
import Container from '../tejas/Container/container.jsx';

import {
    pie,
    scaleSequential,
    interpolateBlues
} from 'd3';

const Tooltip = styled.g`
    text {
        display: none;
    }

    path:hover + text {
        display: block
    }
`;

const getColor = scaleSequential( interpolateBlues )
      .domain([ 0, 6 ]);

const donutPie = angle => pie()
      .value( d => d.yValue )
      .padAngle( angle )
      .sort( null );


class Donut extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const pie = donutPie( this.props.padAngle );

        const {
            data,
            width,
            height,
            innerRadius,
            outerRadius
        } = this.props;

        const transform = `translate(${width / 2}, ${height/2})`;

        const tooltip = ({ data }) => `${ data.xValue } ${ data.yValue }`;

        return (
            <g transform={ transform }>
              {
                  pie( data ).map( function( d, i ) {
                      return (
                          <Tooltip key={ i }>
                            <Arc
                              fill={ getColor( i + 1 ) }
                              endAngle={ d.endAngle }
                              startAngle={ d.startAngle }
                              innerRadius={ innerRadius }
                              outerRadius={ outerRadius } />
                            <text
                              dy="0.3em"
                              textAnchor="middle">
                              { tooltip( d ) }
                            </text>
                          </Tooltip>
                      );
                  })
              }
            </g>
        );
    }
}

export class DonutChart extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }
    render() {
        const { height, marginRight, marginBottom } = this.props;

        return (
            <Container
              height={ height }
              marginRight={ marginRight }
              marginBottom={ marginBottom } >

              <Donut
                data={ this.props.data }
                padAngle={ this.props.padAngle }
                innerRadius={ this.props.innerRadius }
                outerRadius={ this.props.outerRadius } />

            </Container>
        );
    }
}

DonutChart.defaultProps = {
    data: [],
    padAngle: 0.03
};

export default DonutChart;
