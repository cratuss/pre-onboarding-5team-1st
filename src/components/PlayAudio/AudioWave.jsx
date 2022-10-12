import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Wavesurfer from 'react-wavesurfer.js';
import aqualina from '../../assets/audio/aqualina.mp3';

const AudioWave = ({ playing, time }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(time);
  }, [time]);

  return (
    <AudioWaveBlock>
      <Wavesurfer src={aqualina} pos={position} playing={playing} volume={'0'} style={{ height: '50vh' }} />
    </AudioWaveBlock>
  );
};

const AudioWaveBlock = styled.div`
  wave {
    pointer-events: none;
    height: 30vh !important;
  }
`;

export default AudioWave;
