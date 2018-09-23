'use strict';

import React from 'react';

import {
    arc
} from 'd3';

export class Arc extends React.Component {
    render() {
        const {
            endAngle,
            startAngle,
            innerRadius,
            outerRadius
        } = this.props;

        const arcPath = arc()
              .innerRadius( innerRadius || 40 )
              .outerRadius( outerRadius || 50 )
              .startAngle( startAngle || 0 )
              .endAngle( endAngle || Math.PI * 2 );

        return (
            <path
              d={ arcPath() }
              fill={ this.props.fill } />
        );
    }
}

Arc.defaultProps = {
    fill: "#2980b9"
};

export default Arc;
