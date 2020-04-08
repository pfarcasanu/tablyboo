/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Input, Column, Field, Label, Control, Block, Button, Box, Notification,
} from 'rbx';
import { useCookies } from 'react-cookie';
import { functions } from '../../Shared/firebase';
import Suggested from './Suggested';

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
    <div>
      <Block />
      {error && <Notification color="danger">{error}</Notification>}
      <Column size={6} offset={3}>
        <Suggested
          error={{ setError, raiseError }}
          savePassword={savePassword}
          cookies={cookies}
        />
        <Block />
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
            <Button
              color="link"
              onClick={() => submit()}
              disabled={!word.length || !banned.length}
            >
              Add
            </Button>
          </Button.Group>
        </Box>
      </Column>
    </div>
  );
};

export default Add;
