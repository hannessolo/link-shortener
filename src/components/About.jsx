import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class About extends React.Component {
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
    return (
      <div>
        <h1>About</h1>
        <input type='text' value={this.state.value} onChange={this.handleUrlTextChange} />
        <p>Url: {this.state.url}</p>
        <input type='text' value={this.state.value} onChange={this.handleSurlTextChange} />
        <p>Short Url: {this.state.surl}</p>
        <button onClick={this.shortenUrl}>Shorten!</button>
        {this.state.success && <p>Success!</p>}
      </div>
    );
  }

}

export default About;
