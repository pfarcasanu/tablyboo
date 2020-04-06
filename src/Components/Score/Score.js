import React from 'react';
import { Tag, Content, Control } from 'rbx';

const Score = ({ score }) => (
  <Control>
    <Tag.Group gapless size="large">
      <Tag color="dark">
        <Content size="large">
          Score
        </Content>
      </Tag>
      <Tag color="success">
        <Content size="large">
          {score}
        </Content>
      </Tag>
    </Tag.Group>
  </Control>
);

export default Score;
