import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div className='backgroundDiv'>
      <div className='containerStyle'>
      <div>
      <h1 className='welcomeText'>Welcome!</h1>
      <h1 className='welcomeText'>This website lets you</h1>
      <h1 className='welcomeText'>shorten your URLs!</h1>
      </div>
      </div>
    </div>
  );
}

export default Home;
