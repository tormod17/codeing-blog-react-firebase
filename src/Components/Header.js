import React, { Component } from 'react';
import '../css/index.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="">
          <div className="page-header">
            <h1>Coding Blog</h1>      
          </div>   
          <p>This blog aims to be a source of information retention for the hard headed, created with React & Firebase.</p>
        </div>
      </div>
    );
  }
}

export default Header;
