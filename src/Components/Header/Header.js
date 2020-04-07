import React from 'react';
import {
  Navbar, Field, Control, Button,
} from 'rbx';

const Header = () => (
  <Navbar color="primary">
    <Navbar.Brand>
      <Navbar.Item href="/#/">
        <img
          src="logo-white.ico"
          alt="logo"
        />
        <b style={{ paddingLeft: 10 }}>tablyboo</b>
      </Navbar.Item>
      <Navbar.Item />
      <Navbar.Burger />
    </Navbar.Brand>
    <Navbar.Menu>
      <Navbar.Segment align="end">
        <Navbar.Item as="div">
          <Field kind="group">
            <Control>
              <Button as="a" color="link" href="/#/contribute">
                <span>Contribute</span>
              </Button>
            </Control>
          </Field>
        </Navbar.Item>
      </Navbar.Segment>
    </Navbar.Menu>
  </Navbar>
);

export default Header;
