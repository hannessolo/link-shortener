import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      success: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
  }

  shortenUrl() {

    fetch('http://localhost:3000/api/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: "post",
      body: JSON.stringify({
        url: this.state.url
      })
    }).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({
        success: data.success
      });
    });
  }

  handleTextChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/test', {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        works: data.works
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        <h1>About</h1>
        <input type='text' value={this.state.value} onChange={this.handleTextChange} />
        <p>Url: {this.state.url}</p>
        <button onClick={this.shortenUrl}>Shorten!</button>
        {this.state.success && <p>Success!</p>}
      </div>
    );
  }

}

export default About;
