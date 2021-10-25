import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import Home from './pages/home';
import AdminDashBoard from './pages/adminDashboard';
import ResidentDashBoard from './pages/residentDashoard';
import Login from './pages/login';
import Register from './pages/register';
import Conjuntos from './Components/Conjuntos';
import ConfigurarConjuntos from './Components/ConfigurarConjuntos';
import EditarUsuario from './Components/EditarUsuario';


function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/Home'>
          <Home/>
        </Route>
        <Route exact path='/AdminDashboard/'>
          <AdminDashBoard/>
        </Route>
        <Route exact path='/ResidentDashboard/'>
          <ResidentDashBoard/>
        </Route>
        <Route exact path='/Login' >
          <Login/>
        </Route>
        <Route exact path='/Register'>
          <Register/>
        </Route>
        <Route exact path='/Conjuntos'>
          <Conjuntos/>
        </Route>
        <Route exact path='/ConfigurarConjuntos'>
          <ConfigurarConjuntos/>
        </Route>
        <Route exact path='/EditarUsuario'>
          <EditarUsuario/>
        </Route>
        <Route exact path='*'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
