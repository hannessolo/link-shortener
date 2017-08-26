import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import About from './About.jsx';
import Home from './Home.jsx';

const App = () => {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </nav>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    </div>
  );
}

export default App;
