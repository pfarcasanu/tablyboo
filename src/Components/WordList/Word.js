import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  Message, Button, Icon, Tag,
} from 'rbx';

const Word = ({ item }) => {
  const [dropped, setDropped] = useState(false);

  return (
    <Message color="link" style={{ marginBottom: 10 }}>
      <Message.Header>
        {item.word}
        <Button.Group>
          <Button
            onClick={() => setDropped(!dropped)}
            size="small"
          >
            <Icon>
              <FontAwesomeIcon icon={dropped ? faMinus : faPlus} />
            </Icon>
          </Button>
        </Button.Group>
      </Message.Header>
      {dropped && (
        <Message.Body>
          <Tag.Group size="large">
            {Object.values(item.banned).map((word) => (
              <Tag key={word} color="primary">
                {word}
              </Tag>
            ))}
          </Tag.Group>
        </Message.Body>
      )}
    </Message>
  );
};

export default Word;
