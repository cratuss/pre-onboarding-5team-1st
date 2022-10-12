import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import PlayContent from '../components/PlayAudio/PlayContent';

const PlayAudio = () => {
  const location = useLocation();

  const query = location.search;

  const urlSearchParams = new URLSearchParams(query);

  return (
    <PlayAudioBlock>
      <PlayContent fileUrl={urlSearchParams.get('importUrl')} fileTitle={urlSearchParams.get('title')} />
    </PlayAudioBlock>
  );
};

const PlayAudioBlock = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 65px 16px 30px;
`;

export default PlayAudio;
