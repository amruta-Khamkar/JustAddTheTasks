import { useState ,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import changePassword from './Components/ChangePassword';
import { useHistory } from "react-router-dom";


function App() {
 
  const history = useHistory()
  console.log(history)
  const createHistory = require("history").createBrowserHistory;
 
  return (
    <>

     <Router>
     <Switch>
       <Route path="/" exact component={Login} />
       <Route path="/register" component={Register} />
       <Route path="/home" component={Home} />
       <Route path="/changePass" component={changePassword} />
     </Switch>
   </Router>


    </>
  );
}

export default App;
