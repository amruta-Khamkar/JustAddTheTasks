import  { Suspense, lazy } from 'react';
import { useState ,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
// import Register from './Components/Register';
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
// import Login from './Components/Login';
// import Home from './Components/Home';
// import changePassword from './Components/ChangePassword';
import { useHistory } from "react-router-dom";
// import Page from './Components/Page';
import ErrorBoundary from './Components/MyErrorBoundary'

const Login = lazy(() => import("./Components/Login"));
const Register = lazy(() => import("./Components/Register"));
const Home = lazy(() => import("./Components/Home"));
const changePassword = lazy(() => import("./Components/ChangePassword"));
const Page = lazy(() => import('./Components/Page'));

 
function App() {
  const history = useHistory()
  console.log(history)
  const createHistory = require("history").createBrowserHistory;
  return (
    <>

     <Router>
       <ErrorBoundary>
     <Suspense fallback={<img src="https://c.tenor.com/wXNKcHaD4uYAAAAM/shinchan-tapping-feet.gif"></img>}>
     <Switch >

     
   <Route path="/" exact component={Login} />
       <Route path="/register" component={Register} />
       <Route path="/home" component={Home} />
       <Route path="/changePass" component={changePassword} />
       <Route path="/post" component={Page} />
     
     </Switch>
     </Suspense>
     </ErrorBoundary>
   </Router>


    </>
  );
}

export default App;
