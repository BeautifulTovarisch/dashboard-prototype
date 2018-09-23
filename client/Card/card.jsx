'use strict';

import React from 'react';

export class Card extends React.Component {
    render() {
        const {
            title,
            header,
            footer,
            centered,
            children,
            className
        } = this.props;

        const centerText = centered
              ? 'd-flex flex-column align-items-center justify-content-center'
              : '';

        return (
            <div className={ `card ${ className || '' } shadow` }>
              { header && <div className='card-header'>{ header}</div> }
              <div className={ `card-body ${ centerText }` }>
                { children }
              </div>
              { footer && <div className='card-footer'>{ footer() }</div> }
            </div>
        );
    }
}

export default Card;
