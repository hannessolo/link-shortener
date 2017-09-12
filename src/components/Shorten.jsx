import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Shorten extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      surl: '',
      success: false
    };

    this.handleUrlTextChange = this.handleUrlTextChange.bind(this);
    this.handleSurlTextChange = this.handleSurlTextChange.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
  }

  shortenUrl() {

    fetch('http://localhost:3000/api/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        url: this.state.url,
        key: this.state.surl
      })
    }).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({
        success: data.success
      });
    });
  }

  handleUrlTextChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleSurlTextChange(event) {
    this.setState({
      surl: event.target.value
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
          <h1>Shorten a Link</h1>
          <p>Url: {this.state.url}</p>
          <input style={inputStyle} type='text' value={this.state.value} onChange={this.handleUrlTextChange} />
          <p>Short Url: {this.state.surl}</p>
          <input style={inputStyle} type='text' value={this.state.value} onChange={this.handleSurlTextChange} />
          <button style={buttonStyle} onClick={this.shortenUrl}>Shorten!</button>
          {this.state.success && <p>Success!</p>}
        </div>
      </div>
    );
  }

}

export default Shorten;
