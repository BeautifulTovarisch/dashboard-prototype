'use strict';

export const translateX = ( space, padding ) => ( i, j ) =>
  `translate( ${ j * ( space + padding ) }, ${ i * space } )`;

export const translateY = ( space, padding ) => ( i, j ) =>
  `translate( ${ i * ( space + padding ) }, ${ j * space } )`;

export const transformations = {
  "x": translateX,
  "y": translateY
};

export const getTranslation = orientation =>
  transformations[ orientation ];