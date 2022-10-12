import styled from 'styled-components';
import axios from 'axios';
import { FiDownload } from 'react-icons/fi';
import aqualina from '../../assets/audio/aqualina.mp3';

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
      <a onClick={() => downloadFile(aqualina)}>
        <span>다운로드</span>
        <FiDownload />
      </a>
    </DownloadBlock>
  );
};

const DownloadBlock = styled.div`
  a {
    display: flex;
    align-items: center;
    float: right;
    padding-top: 15px;
    border: none;
    font-size: 18px;
    color: #333;
    background-color: transparent;
    cursor: pointer;
    svg {
      margin-left: 5px;
      vertical-align: bottom;
      font-size: 18px;
      color: #666;
    }
  }
`;

export default Download;
