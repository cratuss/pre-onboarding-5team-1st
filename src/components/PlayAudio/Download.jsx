import styled from 'styled-components';
import axios from 'axios';
import { FiDownload } from 'react-icons/fi';

const Download = ({ fileUrl }) => {
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
      <a onClick={() => downloadFile(fileUrl)}>
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
    margin-top: 25px;
    padding: 5px;
    border: 1px solid #999;
    border-radius: 5px;
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
