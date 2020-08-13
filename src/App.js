import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Pokemon from "./components/Pokemon/Pokemon";

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
  );
}

export default App;
