/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Input, Column, Field, Label, Control, Block, Button, Box, Notification,
} from 'rbx';
import { useCookies } from 'react-cookie';
import { functions, db } from '../../Shared/firebase';

const Add = () => {
  const [word, setWord] = useState('');
  const [banned, setBanned] = useState('');
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['pass']);
  const [suggested, setSuggested] = useState([]);

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

  const addSuggested = (item) => {
    const password = cookies.pass || window.prompt('password');
    const func = functions.httpsCallable('addSuggested');
    func({ word: item.word, banned: item.banned, password })
      .then((res) => {
        if (res.data.error === 0) {
          savePassword(password);
          setError();
        } else {
          raiseError();
        }
      });
  };

  const removeSuggested = (suggestedWord) => {
    const password = cookies.pass || window.prompt('password');
    const func = functions.httpsCallable('removeSuggested');
    func({ word: suggestedWord, password })
      .then((res) => {
        if (res.data.error === 0) {
          savePassword(password);
          setError();
        } else {
          raiseError();
        }
      });
  };

  useEffect(() => {
    const handleData = (snap) => {
      const dbItems = snap.val()?.suggested;
      if (dbItems) {
        setSuggested(Object.values(dbItems));
      } else {
        setSuggested([]);
      }
    };

    db.on('value', handleData);
    return () => { db.off('value', handleData); };
  }, []);

  return (
    <div style={{ paddingTop: '10vh' }}>
      <Column size={6} offset={3}>
        {suggested.map((item) => (
          <Box key={item.word}>
            <b>{item.word}</b>
            <p>{item.banned}</p>
            <Block />
            <Button.Group size="small">
              <Button
                onClick={() => addSuggested(item)}
                color="success"
              >
                Add
              </Button>
              <Button
                onClick={() => removeSuggested(item.word)}
                color="danger"
              >
                Remove
              </Button>
            </Button.Group>
          </Box>
        ))}
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

export default Add;
