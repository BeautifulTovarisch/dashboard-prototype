'use strict';

import React, { Component } from 'react';

import styled from 'styled-components';

const Bar = styled.div`
width: ${ props => props.width }%
`;

export class Progress extends Component {
    render() {
        const { label, percent } = this.props;
        return (
            <div className="progress">
              <Bar
                role="progressbar"
                width={ percent || 0 }
                className="progress-bar"
                aria-valuenow={ `${ percent }` }
                aria-valuemin="0"
                aria-valuemax="100">
                { label || ( `${ Math.floor( percent ) }%` ) }
              </Bar>
            </div>
        );
    }
}

Progress.defaultProps = {
    percent: 0
};

export default Progress;
