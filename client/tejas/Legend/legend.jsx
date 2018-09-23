'use strict';

export const LegendBox = props =>
      <rect
        rx="2"
        ry="2"
        fill={ props.fill }
        width={ props.width || 10 }
        height={ props.height || 10 } />

export const LegendLabel = props =>
      <text
        x={ props.x }
        y={ props.y }
        fill={ props.fill } >
        { props.label }
      </text>
