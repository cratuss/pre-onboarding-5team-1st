import styled from 'styled-components';
import { useState } from 'react';
import AudioWave from './AudioWave';
import AudioPlayer from './AudioPlayer';
import Download from './Download';

const PlayContent = () => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  return (
    <PlayContentBlock>
      <AudioWave playing={playing} time={time} />
      <AudioPlayer setPlaying={setPlaying} setTime={setTime} />
      <Download />
    </PlayContentBlock>
  );
};

const PlayContentBlock = styled.div``;

export default PlayContent;
