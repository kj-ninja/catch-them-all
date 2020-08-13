import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Pokemon from "./containers/Pokemon/Pokemon";

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/pokemon/" component={Pokemon}/>
      </Switch>
  );
}

export default App;
