import {
    extent,
    select,
    transition,
    scaleLinear,
    easeCubicInOut,
    schemeCategory20,
    schemeCategory20b,
    schemeCategory20c
} from 'd3';

import {
    findDOMNode
} from 'react-dom';


//LIVE DIMENSION//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Return the 'working' dimensions of our area
export const getLiveHeight = ( height, margins ) =>
    height - ( margins.top + margins.bottom );

export const getLiveWidth = ( width, margins ) =>
    width - ( margins.left + margins.right );

// getD3Color :: Number -> String( Hex );
export const getD3Color = index =>
    schemeCategory20
    .concat( schemeCategory20b )
    .concat( schemeCategory20c )[ index ];

// calcViewBox :: ( Number, Number ) -> String
export const calcViewBox = ( w, h ) =>
    `0 0 ${ w } ${ h }`;

// getDimensionObject :: Component -> a
export const getDimensionObject = ( component ) => ({
    width: component.state.width,
    height: component.state.height,
    liveWidth: component.state.liveWidth,
    liveHeight: component.state.liveHeight,

    marginTop: component.props.margins.top,
    marginLeft: component.props.margins.left,
    marginRight: component.props.margins.right,
    marginBottom: component.props.margins.bottom
});

// selectComponent :: Component -> Selection
export const selectComponent = component =>
    select( findDOMNode( component ) );

// selectComponentAsNode :: Component -> Node
export const selectComponentAsNode = component =>
    findDOMNode( component ).getBoundingClientRect();

// getComponentWidth :: Component -> Number
export const getComponentWidth = component =>
    selectComponentAsNode( component ).width;

// getComponentHeight :: Component -> Number
export const getComponentHeight = component =>
    selectComponentAsNode( component ).height;


//GENERAL D3/////////////////////////////////////////////////////////////////////////////////////////////
//This needs work to be generalized
export const createLinearValueMap = ( length, domain, key, dir ) => {

    const rangeArr = ( dir === 'horizontal' )
          ? [ 0, length ]
          : [ length, 0 ];

    const scale = scaleLinear()
          .range( rangeArr )
          .domain( domain );

    return d => scale( d[ key ] );
};

export const calcTransition = ( fn=easeCubicInOut, duration=350 ) =>
    transition()
    .duration( duration )
    .ease( fn );

//BARCHART FUNCTIONS/////////////////////////////////////////////////////////////////////////////////////
//Calculate width of bars
export const calculateBarWidth = ( dim, data, spacer ) =>
    ( dim.liveWidth / data.length || 1 ) - spacer;
