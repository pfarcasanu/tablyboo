import React, { } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Game from './Components/Game';
import Add from './Components/Add';
import Contribute from './Components/Contribute';
import Header from './Components/Header';

const App = () => (
  <HashRouter>
    <Header />
    <Switch>
      <Route exact path="/contribute">
        <Contribute />
      </Route>
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
