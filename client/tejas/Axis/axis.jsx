'use strict';

import React from 'react';

import {
    renderAxis
} from './calc';

class Axis extends React.Component {
    constructor( props ) {
        super( props );
    }

    componentDidMount(){
        const axisType = this.props.axis;
        renderAxis( this, axisType, this.props );
    }

    componentWillReceiveProps( nextProps ){
        if( !nextProps.data ) {
            return false;
        }
        const axisType = nextProps.axis;
        return this.props.rotate
            ? renderAxis( this, axisType, nextProps )
            .selectAll( "text" )
            .style( "text-anchor", "end" )
            .attr( "dx", "-1.25em" )
            .attr( "dy", "0.35em" )
            .attr( "transform", `rotate( ${ this.props.rotate } )` )
            .attr( "font-size", this.props.fontSize )
            : renderAxis( this, axisType, nextProps );
    }

    render() {
        return (
            <g></g>
        );
    }
}

Axis.defaultProps = {
    "axis":         'x',
    "data":         [],
    "ticks":        10,
    "length":       10,
    "rotate":       0,
    "tickSize":     -100,
    "tickFormat":   null
};

export default Axis;
