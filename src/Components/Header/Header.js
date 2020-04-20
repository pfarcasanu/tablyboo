import React from 'react';
import { Navbar } from 'rbx';

const Header = () => (
  <Navbar color="link">
    <Navbar.Brand>
      <Navbar.Item href="/#/">
        <img
          src="logo-white.ico"
          alt="logo"
        />
        <b style={{ paddingLeft: 10 }}>tablyboo</b>
      </Navbar.Item>
      <Navbar.Burger />
    </Navbar.Brand>
    <Navbar.Menu>
      <Navbar.Segment align="end">
        <Navbar.Item href="/#/list">
          <span>Dictionary</span>
        </Navbar.Item>
        <Navbar.Item href="/#/contribute">
          <span>Contribute</span>
        </Navbar.Item>
      </Navbar.Segment>
    </Navbar.Menu>
  </Navbar>
);

export default Header;
