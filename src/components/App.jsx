import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Shorten from './Shorten.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  render(){

    const divStyle = {
      margin: 0,
      backgroundColor: '#6dffe4',
      height: 40,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center'
    }

    const linkStyle = {
      textDecoration: 'none',
      padding: 10
    }

    return (
      <div>
        <nav style={divStyle}>
          <Link style={linkStyle} to='/'>Home</Link>
          <Link style={linkStyle} to='/shorten'>Shorten</Link>
        </nav>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/shorten' component={Shorten} />
        </div>
      </div>
    );
  }
}

export default App;
