import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from "./components/Home/Home";
import Pokemon from "./containers/Pokemon/Pokemon";

function App() {
  return (
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/'} component={Home}/>
        <Route path={process.env.PUBLIC_URL + '/pokemon/:pokemonId'} component={Pokemon}/>
      </Switch>
  );
}

export default App;
