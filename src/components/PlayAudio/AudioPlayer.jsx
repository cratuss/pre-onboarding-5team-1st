import styled from 'styled-components';
import { useRef } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import test from '../../assets/audio/test.mp3';

const AudioPlayer = ({ setPlaying, setTime }) => {
  const player = useRef();

  return (
    <AudioPlayerBlock>
      <ReactAudioPlayer
        style={{ boxShadow: 'none' }}
        src={test}
        onPlay={() => {
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        volume={1}
        progressUpdateInterval={20}
        progressJumpStep={5000}
        header={'test.mp3'}
        ref={player}
        listenInterval={1000}
        onSeeking={() => setTime(player.current.audio.current.currentTime)}
        // other props here
      />
    </AudioPlayerBlock>
  );
};

const AudioPlayerBlock = styled.div`
  padding-top: 10px;
  box-shadow: 0 5px 5px -5px #ddd;
`;

export default AudioPlayer;
