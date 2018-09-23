'use strict';

import React from 'react';

export class Line extends React.Component {
    constructor( props ) {
        super( props );
    }
    render() {
        const { d, dashed, stroke, strokeWidth } = this.props;
        return (
            <path
              d={ d }
              fill='none'
              stroke={ stroke }
              strokeWidth={ strokeWidth }
              strokeDasharray={ dashed ? "5,5" : 0 } />
        );
    }
}

Line.defaultProps = {
    d: null,
    dashed: false,
    stroke: "#2980b9",
    strokeWidth: 2.00
};

export default Line;
