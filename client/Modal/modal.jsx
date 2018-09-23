'use strict';

// Note: see https://reactjs.org/docs/portals.html and
// https://assortment.io/posts/accessible-modal-component-react-portals-part-1
// for help

import React from 'react';

import { createPortal } from 'react-dom';

import styled from 'styled-components';

// <div />
const ModalBody = styled.div`
padding-top: 0.25em;
`;

// <button />
const ModalClose = styled.button`
position: absolute;
top: 0;
right: 0;
padding: 0.50em;
line-height: 1;
background: #f6f6f7;
border: 0;
box-shadow: 0;
cursor: pointer;
`;

// <aside />
const ModalCover = styled.aside`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 10;
transform: translateZ(0);
background-color: rgba( 0, 0, 0, 0.15 );
`;

// <div />
const ModalDialog = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
padding: 2.5em 1.5em 1.5em 1.5em;
background-color: #FFF;
box-shadow: 0 0 10px 3px rgba( 0, 0, 0, 0.10 );
overflow-y: auto;

@media screen and (min-width: 500px) {
    left: 50%;
    top: 50%;
    height: auto;
    transform: translate( -50%, -50% );
    max-width: 30em;
    max-height: calc( 100% - 1em );
}
`;

export class ModalTrigger extends React.Component {
    render() {
        const { text, onOpen, className } = this.props;
        return (
            <button
              onClick={ onOpen }
              className={ `${ className }` }>{ text }</button>
        );
    }
}

// TODO :: Go through and tighten up accessibility

const ModalContent = ({
    title,
    onClose,
    children,
    modalRef,
    onKeyDown,
    onClickAway
}) => createPortal(
    <ModalCover
      role='dialog'
      tabIndex='-1'
      onClick={ onClickAway }
      onKeyDown={ onKeyDown }
      aria-modal='true'>
      <ModalDialog innerRef={ modalRef } role='document'>
        <ModalClose
          type="button"
          onClick={ onClose }
          className="close"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </ModalClose>
        { title &&
            <h4 className='modal-title'>{ title }</h4>
        }
        <hr/>
        <ModalBody>
          { children }
        </ModalBody>
      </ModalDialog>
    </ModalCover>,
    document.body
);

export class Modal extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false
        };

        this._handleKeyDown = this._handleKeyDown.bind( this );
        this._handleOpenModal = this._handleOpenModal.bind( this );
        this._handleClickAway = this._handleClickAway.bind( this );
        this._handleCloseModal = this._handleCloseModal.bind( this );
    }

    _handleKeyDown( { keyCode } ) {
        // Close on Esc key
        keyCode === 27 && this._handleCloseModal();
    }

    _handleClickAway({ target } ) {
        return ( this.modalDialog && this.modalDialog.contains( target ) )
            ? null
            : this._handleCloseModal();
    }

    toggleScrollLock() {
        // TODO :: implement this without an external CSS
        document.querySelector( 'html' )
            .classList.toggle( 'lock-scroll' );
    }

    _handleOpenModal() {
        this.setState({ open: true });
        this.toggleScrollLock();
    }

    _handleCloseModal() {
        this.setState({ open: false });
        this.toggleScrollLock();
    }

    render() {
        const { open } = this.state;
        const { title, triggerText, children, buttonClass } = this.props;
        return (
            <React.Fragment>
              <ModalTrigger
                text={ triggerText }
                onOpen={ this._handleOpenModal }
                className={ buttonClass } />
              { open &&
                  <ModalContent
                        title={ title }
                        onClose={ this._handleCloseModal }
                        modalRef={ c => this.modalDialog = c }
                        onKeyDown={ this._handleKeyDown }
                        onClickAway={ this._handleClickAway } >
                        { children }
                  </ModalContent>
              }
            </React.Fragment>
        );
    }
}

export default Modal;
