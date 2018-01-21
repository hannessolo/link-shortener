import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('https://hanneshertach.me/shortlink/api/userlinks', ({
      method: 'get',
      headers: {
        'Authorization': sessionStorage.token
      }
    })).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({
        data: data.urls
      });

    });
  }

  render() {

    let list = this.state.data.map(row => {
      return (
        <tr key={ row.key }>
          <td>{ row.url }</td>
          <td>{ row.key }</td>
        </tr>
      );
    });

    return (
      <div className='backgroundDiv'>
        <div className='containerStyle'>
          <div className='content'>
            <h1>Profile Page</h1>
            <button className='buttonStyle' onClick={this.props.logoutHandler} >Log Out</button>
            <h3>Username: {this.props.user && this.props.user.user.username}</h3>
            { list.length != 0 && (
              <table>
                <tbody>
                  {list}
                </tbody>
              </table>
            ) }
          </div>
        </div>
      </div>

    );
  }

}
