import React, { useEffect, useState } from 'react';
import { Block, Column, Field } from 'rbx';
import Item from '../Item';
import GameButtons from '../GameButtons';
import AppButtons from '../AppButtons';
import Loading from '../Loading';
import Timer from '../Timer';
import Score from '../Score';
import shuffle from '../../Shared/shuffle';
import Footer from './Footer';
import 'rbx/index.css';

const gameStyle = {
  padding: 10,
  minHeight: '90vh',
  display: 'flex',
  flexFlow: 'column',
};

const Game = () => {
  const [items, setItems] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);

  const play = () => {
    setPlaying(true);
    setScore(0);
  };

  const stop = () => {
    setPlaying(false);
    setViewIndex(gameIndex);
  };

  useEffect(() => {
    fetch('words.json')
      .then((response) => response.json())
      .then((json) => {
        const wordList = Object.values(json.items);
        const shuffledWords = shuffle(wordList);
        setItems(shuffledWords);
      });
  }, []);

  if (items.length === 0) {
    return (
      <Loading />
    );
  }

  return (
    <div style={gameStyle}>
      <Column
        size={6}
        offset={3}
        style={{ flex: 1 }}
      >
        <Field kind="group" multiline>
          <Timer playing={playing} stop={stop} />
          <Score score={score} />
        </Field>
        <Block />
        <Item item={items[playing ? gameIndex : viewIndex]} />
        <Block />
        {
          playing
            ? (
              <GameButtons
                gameIndexState={{ gameIndex, setGameIndex }}
                scoreState={{ score, setScore }}
                len={items.length}
              />
            )
            : (
              <AppButtons
                viewIndexState={{ viewIndex, setViewIndex }}
                gameIndex={gameIndex}
                len={items.length}
                play={play}
              />
            )
        }
      </Column>
      <Footer numItems={items.length} />
    </div>
  );
};

export default Game;
