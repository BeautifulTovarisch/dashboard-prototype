'use strict';

import React from 'react';

import {
    calcViewBox,
    getComponentWidth,
    getComponentHeight
} from '../calc';

export class Container extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            width: 0,
            height: 0
        };
    }

    measureComponent({ clientWidth, clientHeight }) {

        const { marginRight, marginBottom } = this.props;

        // Need to offset the buffers to prevent infinite expansion
        this.setState({
            width: clientWidth - marginRight,
            height: ( this.props.height || clientHeight ) - marginBottom
        });
    }

    componentDidMount() {
        const { svg } = this;
        
        this.measureComponent( svg );
        window.addEventListener( 'resize', () => this.measureComponent( svg ) );
        
    }

    render() {

        const width                = this.state.width;
        const height               = this.state.height;
        const { marginRight, marginBottom } = this.props;

        const viewBox = calcViewBox( width + marginRight, height + marginBottom );

        // pass down height ( width? ) from container
        // height, width can be measured once and calculated with margins baked-in
        const children = React.Children.map( this.props.children, child =>
            React.cloneElement( child, {
                "width": width,
                "height": height
            })
        );

        return (
            <svg
              ref={ svg => this.svg = svg }
              width="100%"
              height="100%"
              viewBox={ viewBox }
              preserveAspectRatio="xMidYMid meet" >
              { children }
            </svg>
        );
    }

}

Container.defaultProps = {
    marginRight: 0,
    marginBottom: 0
};

export default Container;
