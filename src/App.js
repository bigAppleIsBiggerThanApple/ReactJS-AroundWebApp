import React, { Component } from 'react';
import './App.css';
import {TopBar} from "./TopBar"
import {Register} from "./Register"

class App extends Component {
  render() {
    return (
      <div className="App">
          <TopBar/>
        <Register/>
      </div>
    );
  }
}

export default App;
