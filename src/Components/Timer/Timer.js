import React, { useState, useEffect, useRef } from 'react';
import { Tag, Content, Control } from 'rbx';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}

const Timer = ({ playing, stop }) => {
  const roundTime = 60;
  const [time, setTime] = useState(roundTime);

  useInterval(() => {
    if (time === 0) {
      stop();
      setTime(roundTime);
    }
    if (playing && time > 0) {
      setTime(time - 1);
    }
  }, 1000);

  return (
    <Control>
      <Tag.Group gapless size="large">
        <Tag color="dark">
          <Content size="large">
            Time
          </Content>
        </Tag>
        <Tag color={time <= 5 ? 'danger' : 'link'}>
          <Content size="large">
            {time}
          </Content>
        </Tag>
      </Tag.Group>
    </Control>
  );
};

export default Timer;
