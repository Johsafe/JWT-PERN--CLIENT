import {Fragment, useState} from 'react';
import './App.css';
import {Route ,Switch ,Redirect} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean =>{
    setIsAuthenticated(boolean);
  }
  return (<Fragment>

   
    <div className='container'>
   

      <Switch>

        <Route path='/register' 
        render={props =>
        !isAuthenticated ? (
        <Register {...props} setAuth={setAuth}/>) :(
        <Redirect to="/login"/>) }/>

        <Route path='/login'
         render={props =>
        !isAuthenticated ?(
        <Login {...props} setAuth={setAuth}/>) :(
        <Redirect to="/dashboard"/>)}/>

        <Route path='/dashboard' 
        render={props =>
        isAuthenticated ?(
        <Dashboard {...props} setAuth={setAuth}/>):(
        <Redirect to="/login"/>)}/>
         </Switch>
    </div>

  </Fragment>
   
  );
}

export default App;
