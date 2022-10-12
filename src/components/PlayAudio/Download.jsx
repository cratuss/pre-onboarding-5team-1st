import styled from 'styled-components';
import axios from 'axios';
import test from '../../assets/audio/test.mp3';

const Download = () => {
  const downloadFile = url => {
    (async () => {
      const apiUrl = url;
      try {
        const { data } = await axios(apiUrl, { responseType: 'blob' });
        const fileUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `HAII_${apiUrl.slice(apiUrl.lastIndexOf('/') + 1, apiUrl.lastIndexOf('.'))}_${new Date().getTime()}`;
        document.body.appendChild(link);
        link.click();
        setTimeout(_ => {
          window.URL.revokeObjectURL(fileUrl);
        }, 60000);
        link.remove();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <DownloadBlock>
      <button onClick={() => downloadFile(test)}>다운로드</button>
    </DownloadBlock>
  );
};

const DownloadBlock = styled.div`
  button {
    float: right;
  }
`;

export default Download;
