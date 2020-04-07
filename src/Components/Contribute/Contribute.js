import React, { useState } from 'react';
import {
  Input, Column, Field, Label, Control, Block, Button, Box,
} from 'rbx';
import { db } from '../../Shared/firebase';

const Contribute = () => {
  const [word, setWord] = useState('');
  const [banned, setBanned] = useState('');

  const submit = () => {
    if (!word.length || !banned.length) return;
    db.child('items').child(word).set({
      word,
      banned: banned.split(',').map((s) => s.trim()),
    });
    setWord('');
    setBanned('');
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
          <Button.Group align="centered">
            <Button color="primary" onClick={() => submit()}>
              Submit
            </Button>
          </Button.Group>
        </Box>
      </Column>
    </div>
  );
};

export default Contribute;
