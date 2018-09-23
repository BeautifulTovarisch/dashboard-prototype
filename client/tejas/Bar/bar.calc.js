'use strict';

// TODO :: Consider refactoring these to be generic for horizontal and regular bar charts

export const calcBarX      = ( barWidth, index, spacer=0 )     => ( barWidth + spacer ) * index;
export const calcBarY      = ( barHeight, index, spacer=0 )    => ( barHeight + spacer ) * index;
export const calcBarWidth  = ( width, dataLength=1, spacer=0 ) => ( width / dataLength ) - spacer; 
export const calcBarHeight = ( height, yValue )                => height - yValue;
