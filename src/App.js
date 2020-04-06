import React, { } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Game from './Components/Game';
import Add from './Components/Add';

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/add">
        <Add />
      </Route>
      <Route path="/">
        <Game />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;
