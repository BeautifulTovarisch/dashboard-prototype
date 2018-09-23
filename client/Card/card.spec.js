'use strict';

import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Card from './card.jsx';

test( '<Card />', t => {
    const snap = render.create( <Card /> ).toJSON();
    t.snapshot( snap );
});
