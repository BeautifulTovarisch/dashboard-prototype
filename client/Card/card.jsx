'use strict';

import React from 'react';

export class Card extends React.Component {
    render() {
        const {
            title,
            header,
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
            </div>
        );
    }
}

export default Card;
