import React, { Component } from 'react';
import { Link, Route, NavLink, Redirect } from 'react-router-dom';
import Shorten from './Shorten.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: undefined
    }

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);

  }

  logout() {
    sessionStorage.token = undefined;
    this.setState({
      loggedIn: false,
      user: undefined
    });
  }

  login() {
    this.setState({
      loggedIn: true
    });
  }

  checkLoginState() {

    fetch('http://localhost:3000/api/verify', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        token: sessionStorage.token
      })
    }).then((res)=>{
      return res.json();
    }).then((data)=>{

      this.setState({
        loggedIn: data.loggedIn,
        user: data.user
      });

      let state = data.loggedIn;

      return state;

    });

  }

  componentWillMount() {
    this.checkLoginState();
  }

  render(){


    return (
      <div>
        <nav className='navStyle'>
          <NavLink exact={true} activeClassName='is-active' className='linkStyle' to='/'>Home</NavLink>
          <NavLink activeClassName='is-active' className='linkStyle' to='/shorten'>Shorten</NavLink>
          { this.state.loggedIn ?
            <NavLink activeClassName='is-active' className='linkStyle' to='/profile'>Profile</NavLink>
            : <NavLink activeClassName='is-active' className='linkStyle' to='/signin'>Sign In</NavLink>
          }
        </nav>
        <div>
          <Route path='/profile' render={()=>( this.state.loggedIn ? (< Profile logoutHandler={this.logout} user={this.state.user} />) : (< Redirect to="/signin"/>))} />
          <Route exact path='/' component={Home} />
          <Route path='/shorten' render={()=>( <Shorten user={this.state.user}/>)} />
          <Route path='/signin'  render={()=>( !this.state.loggedIn ? (< Signin loginHandler={this.login} />) : (< Redirect to="/profile"/>))} />
        </div>
      </div>
    );
  }
}

export default App;
