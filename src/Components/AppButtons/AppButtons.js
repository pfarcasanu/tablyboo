import React from 'react';
import { Button } from 'rbx';

const AppButtons = ({
  viewIndexState, gameIndex, len, play,
}) => {
  const getPrevious = () => Math.max(viewIndexState.viewIndex - 1, 0);

  const getNext = () => {
    const { viewIndex } = viewIndexState;
    return viewIndex === gameIndex ? viewIndex : (viewIndex + 1) % len;
  };

  const setPrevious = () => {
    const prev = getPrevious();
    viewIndexState.setViewIndex(prev);
  };

  const setNext = () => {
    const next = getNext();
    viewIndexState.setViewIndex(next);
  };

  return (
    <Button.Group size="medium" align="centered">
      <Button
        color="light"
        onClick={() => setPrevious()}
        disabled={viewIndexState.viewIndex === getPrevious()}
      >
        Back
      </Button>
      <Button color="link" onClick={() => play()}>
        Play
      </Button>
      <Button
        color="light"
        onClick={() => setNext()}
        disabled={viewIndexState.viewIndex === getNext()}
      >
        Next
      </Button>
    </Button.Group>
  );
};

export default AppButtons;
