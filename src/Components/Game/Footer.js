import React from 'react';

const footerStyle = {
  position: 'fixed',
  bottom: 25,
  width: '90%',
  left: '5%',
  textAlign: 'center',
  color: '#5f6c7a',
};

const Footer = ({ numItems }) => (
  <div style={footerStyle}>
    Tablyboo features
    {' '}
    <b>{numItems}</b>
    {' '}
    words and counting. Please help expand the game by
    {' '}
    <a href="/#/contribute">contributing</a>
    .
  </div>
);

export default Footer;
