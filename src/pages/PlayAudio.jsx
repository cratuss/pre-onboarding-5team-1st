import styled from 'styled-components';
import PlayContent from '../components/PlayAudio/PlayContent';

const PlayAudio = () => {
  return (
    <PlayAudioBlock>
      <PlayContent />
    </PlayAudioBlock>
  );
};

const PlayAudioBlock = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 65px 16px 30px;
`;

export default PlayAudio;
