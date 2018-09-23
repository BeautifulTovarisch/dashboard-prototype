'use strict';

import React from 'react';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { fetchClients } from './side-panel.dal';

const Panel = styled.nav`
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
`;

const PanelItem = styled.li`

line-height: 40px;

a {
    display: block;
    text-decoration: none;
    text-indent: 20px;
    color: #999999;

    &:hover {
        text-decoration: none;
        color: #FFF;
    }
}

`;

const StickyPanel = styled.div`
    position: sticky;
    top: 0;
    height: calc(100vh - 45px);
`;

export class SidePanel extends React.Component {
    constructor() {
        super();
        // TODO :: Allow user to hide side bar;
        this.state = {
            hidden: false,
            clients: []
        };
    }

    async componentDidMount() {
        try {
            const { data } = await fetchClients();

            this.setState({
                clients: data
            });

        } catch( e ) {
            this.setState({
                error: e
            });
        }
    }

    render() {
        const { hidden, clients } = this.state;
        return (
            <Panel
              className='col-md-2 bg-dark d-none d-lg-block'>
              <StickyPanel className='text-white'>
                <ul className='nav flex-column mt-4'>
                  <li className='nav-item'>
                    <h4>MOUs</h4>
                  </li>
                  {
                      clients.map( function( { client_name }, i ) {
                          return (
                              <PanelItem key={ i } className='nav-item'>
                                <Link to={ `/mous/client/${ client_name }` }>
                                  { client_name }
                                </Link>
                              </PanelItem>
                          );
                      })
                  }
                </ul>
                </StickyPanel>
            </Panel>
        );
    }
}

export default SidePanel;
