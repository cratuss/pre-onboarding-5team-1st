import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Wavesurfer from 'react-wavesurfer.js';
import test from '../../assets/audio/test.mp3';

const AudioWave = ({ playing, time }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(time);
  }, [time]);

  return (
    <AudioWaveBlock>
      <Wavesurfer src={test} pos={position} playing={playing} volume={'0'} />
    </AudioWaveBlock>
  );
};

const AudioWaveBlock = styled.div`
  wave {
    pointer-events: none;
  }
`;

export default AudioWave;
