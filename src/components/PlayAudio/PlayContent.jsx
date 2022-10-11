import styled from 'styled-components';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import test from '../../assets/audio/test.mp3';

const PlayContent = () => {
  return (
    <PlayContentBlock>
      <ReactAudioPlayer
        autoPlay
        src={test}
        onPlay={e => console.log('onPlay')}
        volume={1}
        showSkipControls={true}
        showJumpControls={true}
        // other props here
      />
    </PlayContentBlock>
  );
};

const PlayContentBlock = styled.div`
  max-width: 800px;
`;

export default PlayContent;
