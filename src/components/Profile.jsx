import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

export default class Profile extends React.Component {

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <button onClick={this.props.logoutHandler} >Log Out</button>
        <h3>Username: {this.props.user && this.props.user.user.username}</h3>
      </div>
    );
  }

}
