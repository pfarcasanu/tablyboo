/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Box, Button, Block } from 'rbx';
import { db, functions } from '../../Shared/firebase';

const Suggested = ({ cookies, savePassword, error }) => {
  const [suggested, setSuggested] = useState([]);

  const addSuggested = (item) => {
    const password = cookies.pass || window.prompt('password');
    const func = functions.httpsCallable('addSuggested');
    func({ word: item.word, banned: item.banned, password })
      .then((res) => {
        if (res.data.error === 0) {
          savePassword(password);
          error.setError();
        } else {
          error.raiseError();
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
          error.setError();
        } else {
          error.raiseError();
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
    <div>
      {suggested.map((item) => (
        <Box key={item.word}>
          <b>{item.word}</b>
          <p>{item.banned}</p>
          <Block />
          <Button.Group align="centered">
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
    </div>
  );
};

export default Suggested;
