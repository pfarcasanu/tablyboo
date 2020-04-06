/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Box, Notification, Tag, Title,
} from 'rbx';

const Item = ({ item }) => {
  const bannedWords = item.banned ? Object.values(item.banned) : [];

  return (
    <div style={{ paddingTop: 10, paddingBottom: 30 }}>
      <Box>
        <Notification color="link" style={{ textAlign: 'center' }}>
          <Title size="large">
            {item.word}
          </Title>
        </Notification>
        <Tag.Group>
          {bannedWords.map((word, i) => (
            <Tag
              key={`word-${i}`}
              color="warning"
              size="large"
            >
              {word}
            </Tag>
          ))}
        </Tag.Group>
      </Box>
    </div>
  );
};

export default Item;
