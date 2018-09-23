'use strict';

import {
    extent,
    format,
    axisLeft,
    scaleBand,
    scaleTime,
    axisBottom,
    timeFormat,
    scaleLinear
} from 'd3';

import  {
    selectComponent
} from '../calc.js';

export const mapDomain = ( data, key ) =>
    extent( data, d => d[ key ] );

export const timeAxis = props => {
    const xScale = scaleTime()
          .range( [ 0, props.length ] )
          .domain( extent( props.data.map( d => d[ 'xValue' ] ) ) );

    return axisBottom( xScale )
        .ticks( props.data.length )
        .tickFormat( timeFormat( ( props.tickFormat || "%b" ) ) );
};

export const xAxis = props => {
    const xScale = scaleBand()
          .range( [ 0, props.length ] )
          .domain( props.data.map( d => d[ 'xValue' ] ) );

    return axisBottom( xScale );

};

export const yAxis = props => {
    const yScale = scaleLinear()
          .range( [ props.length, 0 ] )
          .domain( extent( [ 0 ].concat( mapDomain( props.data, 'yValue' ) ) ) );

    return axisLeft( yScale )
        .ticks( props.ticks )
        .tickSize( props.tickSize )
        .tickFormat( format( props.tickFormat || ",.0f" ) );
};

export const calcAxis = axis => {
    const axes = {
        "x": xAxis,
        "y": yAxis,
        'time': timeAxis
    };

    return axes[ axis ];
};

export const renderAxis = ( component, axis, props ) =>
    selectComponent( component )
    .call( calcAxis( axis )( props ) );
