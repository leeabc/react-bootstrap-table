import React from 'react';
import ReactDOM from 'react-dom';

import { IndexRoute, Router, Route } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import GettingStarted from './components/GettingStarted';
import PageNotFound from './components/PageNotFound';

import Basic from './basic/demo';
import Column from './column/demo';
import Sort from './sort/demo';
import ColumnFormat from './column-format/demo';
import ColumnFilter from './column-filter/demo';
import Selection from './selection/demo';
import Pagination from './pagination/demo';
import Manipulation from './manipulation/demo';
import CellEdit from './cell-edit/demo';
import Style from './style/demo';
import Advance from './advance/demo';
import Others from './others/demo';
import Complex from './complex/demo';
import Remote from './remote/demo';

const routes = (
  <Router>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='getting-started' component={ GettingStarted }/>
      <Route path='examples'>
        <Route path='basic' component={ Basic } />
        <Route path='column' component={ Column } />
        <Route path='sort' component={ Sort } />
        <Route path='column-format' component={ ColumnFormat } />
        <Route path='column-filter' component={ ColumnFilter } />
        <Route path='selection' component={ Selection } />
        <Route path='pagination' component={ Pagination } />
        <Route path='manipulation' component={ Manipulation } />
        <Route path='cell-edit' component={ CellEdit } />
        <Route path='style' component={ Style } />
        <Route path='advance' component={ Advance } />
        <Route path='others' component={ Others } />
        <Route path='complex' component={ Complex } />
        <Route path='remote' component={ Remote } />
      </Route>
      <Route path='*' component={ PageNotFound }/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#root'));
