import styled from 'styled-components';
import axios from 'axios';
import { FiVolume2 } from 'react-icons/fi';
import { FiMoreVertical } from 'react-icons/fi';
import RecordFile from '../components/RecordFile';
import aqualina from '../assets/audio/aqualina.mp3';
import Barradeen from '../assets/audio/Barradeen.mp3';
import GhostrifterOfficial from '../assets/audio/GhostrifterOfficial.mp3';
import { useEffect, useState } from 'react';

const RecordList = () => {
  const [fileList, setFileList] = useState([]);

  // const FILE_LIST = [
  //   { title: '1번파일', date: '2022-10-12', capacity: '12.6MB' },
  //   { title: '2번파일', date: '2022-10-11', capacity: '15.9MB' },
  //   { title: '3번파일', date: '2022-10-10', capacity: '403KB' },
  // ];

  useEffect(() => {
    (async () => {
      const fileUrl = [aqualina, Barradeen, GhostrifterOfficial];
      const axiosArray = [];
      try {
        for (let i = 0; i < fileUrl.length; i++) {
          const { data } = await axios(fileUrl[i], { responseType: 'blob' });
          const file = new File([data], fileUrl[i], { type: 'text/json;charset=utf-8' });
          const fileTitle = file.name.slice(file.name.lastIndexOf('/') + 1);
          const fileDate = file.lastModifiedDate.getFullYear() + '-' + (file.lastModifiedDate.getMonth() + 1) + '-' + file.lastModifiedDate.getDate();
          const fileCapacity = (file.size / 1024 / 1024).toFixed(1) + 'MB';
          const oneListData = { title: fileTitle, date: fileDate, capacity: fileCapacity, importUrl: file.name };
          axiosArray.push(oneListData);
        }
        setFileList(axiosArray);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <RecordListBlock>
      {fileList.map(data => {
        return <RecordFile key={data.title} title={data.title} date={data.date} capacity={data.capacity} importUrl={data.importUrl} />;
      })}
    </RecordListBlock>
  );
};
const RecordListBlock = styled.div`
  min-height: 100vh;
  padding: 65px 16px 30px;
`;
export default RecordList;
