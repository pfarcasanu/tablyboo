import React from 'react';
import { Button } from 'rbx';

const GameButtons = ({ gameIndexState, scoreState, len }) => {
  const incrementIndex = () => {
    const nextIndex = (gameIndexState.gameIndex + 1) % len;
    gameIndexState.setGameIndex(nextIndex);
  };

  const success = () => {
    scoreState.setScore(scoreState.score + 1);
    incrementIndex();
  };

  const pass = () => {
    incrementIndex();
  };

  const cheated = () => {
    const newScore = Math.max(scoreState.score - 1, 0);
    scoreState.setScore(newScore);
    incrementIndex();
  };

  return (
    <Button.Group align="centered" size="medium">
      <Button color="danger" onClick={() => cheated()}>
        Cheated
      </Button>
      <Button color="info" onClick={() => pass()}>
        Pass
      </Button>
      <Button color="success" onClick={() => success()}>
        Got It
      </Button>
    </Button.Group>
  );
};

export default GameButtons;
