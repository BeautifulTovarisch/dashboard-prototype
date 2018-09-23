
//TRANSLATORS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Group translations ( for axis ect, not for stand alone labels )
export const xGroupTranslateBottom = ( dim, ratio = 0.5 ) =>
    `translate(${ dim.marginLeft },${ dim.height - ( dim.marginBottom * ratio ) } )`;

export const xGroupTranslateTop = ( dim, ratio = 0.5 ) =>
    `translate(${ dim.marginLeft },${ dim.marginsTop * ratio } )`;

export const yGroupTranslateLeft = ( dim, ratio = 0.5 ) =>
    `translate(${ dim.marginLeft * ratio }, ${ dim.marginTop} )`;

export const yGroupTranslateRight = ( dim, ratio = 0.5 ) =>
     `translate(${ dim.width - ( dim.marginRight * ratio ) }, ${ dim.marginTop } )`;

//Individual translations ( for labels )
//For the top center, title for example
export const centerTopTranslate = ( dim, ratio = 0.5 ) =>
    `translate(${ dim.width/2 }, ${ dim.marginTop * ratio } )`;

export const centerLeftTranslate = ( dim, ratio = 0.5 ) =>
    `translate(${ dim.marginLeft * ratio }, ${ dim.height/2  } )`;

export const centerBottomTranslate = ( dim, ratio = 0.5) =>
    `translate(${ dim.width/2 }, ${ dim.height - ( dim.marginTop * ratio )  } )`;

export const centerRightTranslate = ( dim, ratio = 0.5) =>
    `translate(${ dim.width - ( dim.marginRight * ratio) }, ${ dim.height/2 } )`;


export const liveCenterTopTranslate = ( dim, ratio = 0.5 ) =>
    `translate(${ ( dim.liveWidth/2 ) + ( dim.marginLeft ) }, ${ dim.marginTop * ratio } )`;

export const liveCenterLeftTranslate = ( dim, ratio = 0.5 ) =>
    `translate(${ dim.marginLeft * ratio }, ${ ( dim.liveHeight/2 ) + dim.marginTop  } )`;

export const liveCenterBottomTranslate = ( dim, ratio = 0.5) =>
    `translate( ${ ( dim.liveWidth/2 ) + dim.marginLeft }, ${ dim.height - ( dim.marginTop * ratio )  } )`;

export const liveCenterRightTranslate = ( dim, ratio = 0.5) =>
    `translate(${ dim.width - ( dim.marginRight * ratio) }, ${ ( dim.liveHeight/2  ) + dim.marginTop } )`;


export const topLeftTranslate = ( dim, verticalRatio = 0.1, horizontalRatio = 0.1 ) => 
  `translate( ${ dim.width - ( dim.width * horizontalRatio) }, ${dim.height * verticalRatio } )`
export const topRightTranslate = ( dim, verticalRatio = 0.1, horizontalRatio = 0.1 ) => 
  `translate( ${ dim.width - (dim.width * horizontalRatio) }, ${dim.height * verticalRatio } )`

export const bottomLeftTranslate = ( dim, verticalRatio = 0.1, horizontalRatio = 0.1 ) => 
  `translate( ${ dim.width - (dim.width * horizontalRatio) }, ${dim.height * verticalRatio } )`

export const bottomRightTranslate = ( dim, verticalRatio = 0.1, horizontalRatio = 0.1 ) => 
  `translate( ${ dim.width - (dim.width * horizontalRatio) }, ${dim.height * verticalRatio } )`


//For the 'meat' of the chart, be in lines or columns
export const mainGroupTranslate = ( dim ) =>
    `translate(${ dim.marginLeft }, ${dim.marginTop} )`;


export const rotateTransform = ( rotate = 0 ) => `rotate( ${ rotate } )`;


export const createCenteredTranslationIncrementor = ( length ) => i =>
  `translate( ${ length  + ( length * i ) - ( length / 2 ) }, 0 )`;
