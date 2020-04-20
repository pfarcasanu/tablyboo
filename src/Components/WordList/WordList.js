import React, { useState, useEffect } from 'react';
import { Column, Input } from 'rbx';
import { db } from '../../Shared/firebase';
import Word from './Word';

const listStyle = {
  padding: 20,
};

const WordList = () => {
  const [items, setItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleData = (snap) => {
      const dbItems = snap.val()?.items;
      if (dbItems) {
        const itemArray = Object.values(dbItems);
        setItems(itemArray);
      }
    };

    db.on('value', handleData);
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    setDisplayItems(items.filter((item) => item.word.toLowerCase().startsWith(search)));
  }, [search, items]);

  return (
    <div style={listStyle}>
      <Column size={8} offset={2}>
        <Input
          type="text"
          placeholder="Search ..."
          style={{ marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        {displayItems.map((item) => (
          <Word key={item.word} item={item} />
        ))}
      </Column>
    </div>
  );
};

export default WordList;
