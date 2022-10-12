import styled from 'styled-components';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import test from '../../assets/audio/test.mp3';

const AudioPlayer = ({ setPlaying }) => {
  return (
    <AudioPlayerBlock>
      <ReactAudioPlayer
        style={{ boxShadow: 'none' }}
        src={test}
        onPlay={() => {
          setPlaying(true);
          setMuted(true);
        }}
        onPause={() => setPlaying(false)}
        volume={1}
        progressUpdateInterval={20}
        progressJumpStep={5000}
        header={'test.mp3'}
        // other props here
      />
    </AudioPlayerBlock>
  );
};

const AudioPlayerBlock = styled.div``;

export default AudioPlayer;
