import React, { useState } from 'react';
import {
  Input, Column, Field, Label, Control, Block, Button, Box, Notification,
} from 'rbx';
import { functions } from '../../Shared/firebase';

const Contribute = () => {
  const [word, setWord] = useState('');
  const [banned, setBanned] = useState('');
  const [error, setError] = useState();

  const submit = () => {
    if (!word.length || !banned.length) return;
    const suggestWord = functions.httpsCallable('suggestWord');
    suggestWord({ word, banned })
      .then(() => {
        setWord('');
        setBanned('');
        setError();
      })
      .catch(() => {
        setError('something went wrong');
      });
  };

  return (
    <div style={{ paddingTop: '10vh' }}>
      <Column size={6} offset={3}>
        <Box>
          <Field>
            <Label>Word</Label>
            <Control>
              <Input
                type="text"
                placeholder="cat"
                onChange={(e) => setWord(e.target.value)}
                value={word}
              />
            </Control>
          </Field>
          <Field>
            <Label>Banned Words (Comma Delineated)</Label>
            <Control>
              <Input
                type="text"
                placeholder="dog,feline,nine lives,pet,tiger"
                onChange={(e) => setBanned(e.target.value)}
                value={banned}
              />
            </Control>
          </Field>
          <Block />
          {error && <Notification>{error}</Notification>}
          <Button.Group align="centered">
            <Button
              color="link"
              onClick={() => submit()}
              disabled={!word.length || !banned.length}
            >
              Submit
            </Button>
          </Button.Group>
        </Box>
      </Column>
    </div>
  );
};

export default Contribute;
