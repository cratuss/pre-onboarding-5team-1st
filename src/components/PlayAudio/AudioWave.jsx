import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Wavesurfer from 'react-wavesurfer.js';
import test from '../../assets/audio/test.mp3';

const AudioWave = ({ playing }) => {
  const [position, setPosition] = useState(0);
  const [muted, setMuted] = useState(true);

  const ref = useRef();

  const handlePositionChange = position => {};
  const onReadyHandler = e => {};

  useEffect(() => {
    console.log(ref.current.state);
  }, [playing]);

  return (
    <AudioWaveBlock>
      <Wavesurfer src={test} position={100} onPositionChange={handlePositionChange} onReady={onReadyHandler} playing={playing} volume={0} ref={ref} />
    </AudioWaveBlock>
  );
};

const AudioWaveBlock = styled.div`
  wave {
    pointer-events: none;
  }
`;

export default AudioWave;
