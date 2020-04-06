import React, { useEffect, useState } from 'react';
import { Block, Column, Field } from 'rbx';
import Item from '../Item';
import GameButtons from '../GameButtons';
import AppButtons from '../AppButtons';
import Loading from '../Loading';
import Timer from '../Timer';
import Score from '../Score';
import db from '../../Shared/db';
import 'rbx/index.css';

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
    const handleData = (snap) => {
      const dbItems = snap.val()?.items;
      if (dbItems) setItems(Object.values(dbItems));
    };

    db.on('value', handleData);
    return () => { db.off('value', handleData); };
  }, []);

  if (items.length === 0) {
    return (
      <Loading />
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <Column size={6} offset={3}>
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
    </div>
  );
};

export default Game;
