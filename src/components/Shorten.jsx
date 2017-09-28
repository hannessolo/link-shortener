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

    fetch('http://hanneshertach.me/shortlink/api/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        url: this.state.url,
        key: this.state.surl,
        createdBy: this.props.user.user.username
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
      <div className='backgroundDiv'>
        <div className='containerStyle'>
          <div className='content'>
            <h1>Shorten a Link</h1>
            <p>Url: {this.state.url}</p>
            <input className='inputStyle' type='text' value={this.state.value} onChange={this.handleUrlTextChange} />
            <p>Short Url: {this.state.surl}</p>
            <input className='inputStyle' type='text' value={this.state.value} onChange={this.handleSurlTextChange} />
            <button className='buttonStyle' onClick={this.shortenUrl}>Shorten!</button>
            {this.state.success && <p>Success!</p>}
          </div>
        </div>
      </div>
    );
  }

}

Shorten.defaultProps = {
  user: {
    user: {
      username: 'guest'
    }
  }
}

export default Shorten;
