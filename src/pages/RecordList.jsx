import styled from 'styled-components';
import { FiVolume2 } from 'react-icons/fi';
import { FiMoreVertical } from 'react-icons/fi';
import RecordFile from '../components/RecordFile';

const RecordList = () => {
  const FILE_LIST = [
    { title: '1번파일', date: '2022-10-12', capacity: '12.6MB' },
    { title: '2번파일', date: '2022-10-11', capacity: '15.9MB' },
    { title: '3번파일', date: '2022-10-10', capacity: '403KB' },
  ];

  return (
    <RecordListBlock>
      {FILE_LIST.map(data => {
        return <RecordFile key={data.title} title={data.title} date={data.date} capacity={data.capacity} />;
      })}
    </RecordListBlock>
  );
};
const RecordListBlock = styled.div`
  min-height: 100vh;
  padding: 55px 16px 30px;
`;
export default RecordList;
