import React, { useState } from 'react';
import {
  Input, Column, Field, Label, Control, Block, Button, Box, Notification,
} from 'rbx';
import { useCookies } from 'react-cookie';
import { functions } from '../../Shared/firebase';

const Add = () => {
  const [word, setWord] = useState('');
  const [banned, setBanned] = useState('');
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['pass']);

  const savePassword = (password) => {
    setCookie('pass', password);
  };

  const raiseError = () => {
    setError('There was an error. The password may be incorrect, or your data was invalid.');
    removeCookie('pass');
  };

  const submit = () => {
    // eslint-disable-next-line no-alert
    const password = cookies.pass || window.prompt('password');
    const addWord = functions.httpsCallable('addWord');
    addWord({ word, banned, password })
      .then((res) => {
        if (res.data.error === 0) {
          savePassword(password);
          setError();
          setWord('');
          setBanned('');
        } else {
          raiseError();
        }
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
          {error && <Notification color="danger">{error}</Notification>}
          <Button.Group align="centered">
            <Button
              color="primary"
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

export default Add;
