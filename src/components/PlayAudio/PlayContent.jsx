import styled from 'styled-components';
import { useState } from 'react';
import AudioWave from './AudioWave';
import AudioPlayer from './AudioPlayer';
import Download from './Download';

const PlayContent = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <PlayContentBlock>
      <AudioWave playing={playing} />
      <AudioPlayer setPlaying={setPlaying} />
      <Download />
    </PlayContentBlock>
  );
};

const PlayContentBlock = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 80px;
  padding-right: 16px;
  padding-left: 16px;
`;

export default PlayContent;
