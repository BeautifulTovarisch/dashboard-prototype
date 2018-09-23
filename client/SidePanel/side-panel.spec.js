'use strict';

import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import { MemoryRouter as Router } from 'react-router-dom';

import { SidePanel } from './side-panel.jsx';

test( '<SidePanel />', t => {
    const component = render.create( <Router><SidePanel /></Router> ).toJSON();
    t.snapshot( component );
});
