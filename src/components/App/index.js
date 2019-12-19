import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Helmet } from 'react-helmet';
import './App.css';
import Header from '../Header';
import Footer from '../Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Helmet>
        <title>Helmet Test</title>
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Footer/>
    </div>
  );
}

export default App;
