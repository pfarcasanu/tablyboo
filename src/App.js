import React, { } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Game from './Components/Game';
import WordList from './Components/WordList';
import Header from './Components/Header';

const App = () => (
  <HashRouter>
    <Header />
    <Switch>
      <Route exact path="/list">
        <WordList />
      </Route>
      <Route path="/">
        <Game />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;
