import React, { useState, useEffect } from 'react';
import { Column, Input } from 'rbx';
import Word from './Word';

const listStyle = {
  padding: 20,
};

const WordList = () => {
  const [items, setItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('words.json')
      .then((response) => response.json())
      .then((json) => setItems(Object.values(json.items)));
  }, []);

  useEffect(() => {
    setDisplayItems(items.filter((item) => item.word.toLowerCase().startsWith(search)));
  }, [search, items]);

  return (
    <div style={listStyle}>
      <Column size={8} offset={2}>
        <Input
          type="text"
          placeholder={`search from ${items.length} words ...`}
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
