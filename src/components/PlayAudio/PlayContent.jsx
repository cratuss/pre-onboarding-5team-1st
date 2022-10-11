import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

import test from '../../assets/audio/test.mp3';

const PlayContent = () => {
  return (
    <PlayContentBlock>
      <ReactAudioPlayer src='../../assets/audio/test.mp3' autoPlay controls />
    </PlayContentBlock>
  );
};

const PlayContentBlock = styled.div``;

export default PlayContent;
