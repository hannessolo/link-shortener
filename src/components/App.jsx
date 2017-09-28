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

    fetch('http://hanneshertach.me/shortlink/api/verify', {
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
          <NavLink exact={true} activeClassName='is-active' className='linkStyle' to='/shortlink'>Home</NavLink>
          <NavLink activeClassName='is-active' className='linkStyle' to='/shortlink/shorten'>Shorten</NavLink>
          { this.state.loggedIn ?
            <NavLink activeClassName='is-active' className='linkStyle' to='/shortlink/profile'>Profile</NavLink>
            : <NavLink activeClassName='is-active' className='linkStyle' to='/shortlink/signin'>Sign In</NavLink>
          }
        </nav>
        <div>
          <Route path='/shortlink/profile' render={()=>( this.state.loggedIn ? (< Profile logoutHandler={this.logout} user={this.state.user} />) : (< Redirect to="/shortlink/signin"/>))} />
          <Route exact path='/shortlink' component={Home} />
          <Route path='/shortlink/shorten' render={()=>( <Shorten user={this.state.user}/>)} />
          <Route path='/shortlink/signin'  render={()=>( !this.state.loggedIn ? (< Signin loginHandler={this.login} />) : (< Redirect to="/shortlink/profile"/>))} />
        </div>
      </div>
    );
  }
}

export default App;
