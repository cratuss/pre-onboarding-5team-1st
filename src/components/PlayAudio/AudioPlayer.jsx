import styled from 'styled-components';
import { useRef } from 'react';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayer = ({ setPlaying, setTime, fileUrl, fileTitle }) => {
  const player = useRef();

  return (
    <AudioPlayerBlock>
      <ReactAudioPlayer
        style={{ boxShadow: 'none', padding: '15px 0 0 0' }}
        src={fileUrl}
        onPlay={() => {
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        volume={1}
        progressUpdateInterval={20}
        progressJumpStep={5000}
        header={fileTitle}
        ref={player}
        listenInterval={1000}
        onSeeking={() => setTime(player.current.audio.current.currentTime)}
      />
    </AudioPlayerBlock>
  );
};

const AudioPlayerBlock = styled.div`
  box-shadow: 0 5px 5px -5px #ddd;

  .rhap_controls-section {
    margin-top: 20px;
    padding: 10px;
  }
`;

export default AudioPlayer;
