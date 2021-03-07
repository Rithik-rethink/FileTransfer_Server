import React from 'react';
import './App.css';
import {Switch , Route} from 'react-router-dom';
import Upload from './Components/Upload/Upload.js';
import Login from './Components/LoginUserAuth/Login.js';
import { render } from 'react-dom';

class App extends React.Component{
  render(){

    return(
      <div>
        <Switch>
          <Route exact path='/upload' component={Upload}/>
          <Route exact path='/' component={Login}/>
        </Switch>
      </div>
    );
  }
}
export default App;