import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

export default class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      success: false,
      message: ''
    };

    this.handleUsernameTextChange = this.handleUsernameTextChange.bind(this);
    this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  handleUsernameTextChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordTextChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  loginUser() {
    fetch('http://localhost:3000/api/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((res)=>{
      return res.json();
    }).then((data)=>{

      sessionStorage.setItem('token', data.token);

      this.setState({
        message: data.message
      });

      if(data.success == true) {
        this.props.loginHandler();
      }

    });
  }

  render() {

    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const inputStyle = {
      width: '100%',
      padding: 5,
      border: 'solid 1px #dcdcdc',
      borderRadius: 0,
      boxSizing: 'border-box',
      boxShadow: 'none',
      appearance: 'none'
    }

    const buttonStyle = {
      marginTop: 20,
      width: '100%',

    }

    return (
      <div style={containerStyle}>
        <div>
          <h1>Sign in</h1>
          <p>Username: {this.state.username}</p>
          <input style={inputStyle} type='text' value={this.state.value} onChange={this.handleUsernameTextChange} />
          <p>Password: {this.state.password}</p>
          <input style={inputStyle} type='password' value={this.state.value} onChange={this.handlePasswordTextChange} />
          <button style={buttonStyle} onClick={this.loginUser}>Log In!</button>
          {this.state.success && <p>Success!</p>}
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }

}
