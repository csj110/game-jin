import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h2>welcome to the new project</h2>
            <p className='App-intro'>
                可以<code>src/App.js</code>修改
            </p>
        </header>
      </div>
    );
  }
}

export default App;