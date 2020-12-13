import React from 'react';
import constants from '../../Shared/constants';

const footerStyle = {
  textAlign: 'center',
  color: '#5f6c7a',
};

const Footer = ({ numItems }) => (
  <div style={footerStyle}>
    Tablyboo features
    {' '}
    <b>{numItems}</b>
    {' '}
    words and counting. Help expand the vocabulary by
    {' '}
    <a href={constants.CONTRIBUTE_LINK}>contributing</a>
    .
  </div>
);

export default Footer;
