import styled from 'styled-components';
import test from '../../assets/audio/test.mp3';

const Download = () => {
  const downloadFile = url => {
    url = test;

    fetch(url, { method: 'GET' })
      .then(res => {
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'test';
        document.body.appendChild(a);
        a.click();
        setTimeout(_ => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
        setOpen(false);
      })
      .catch(err => {
        console.error('err: ', err);
      });
  };

  return (
    <DownloadBlock>
      <button onClick={() => downloadFile()}>다운로드</button>
    </DownloadBlock>
  );
};

const DownloadBlock = styled.div`
  button {
    float: right;
  }
`;

export default Download;
