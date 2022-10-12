import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { FiVolume2 } from 'react-icons/fi';
import { FiMoreVertical } from 'react-icons/fi';

const RecordFile = ({ date, title, capacity }) => {
  const navigate = useNavigate();
  return (
    <RecordFileBlock>
      <div
        className='d-flex cursor'
        onClick={() => {
          navigate('/play');
        }}
      >
        <span className='list-icon'>
          <FiVolume2 />
        </span>
        <div className='title-area'>
          <h3 className='title'>{title}</h3>
          <span className='gray mr-10'>{date}</span> <span className='gray'>{capacity}</span>
        </div>
      </div>
      <span className='gray cursor'>
        <FiMoreVertical />
      </span>
    </RecordFileBlock>
  );
};
const RecordFileBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  :nth-last-child(1) {
    margin-bottom: none;
    border: none;
  }
  .d-flex {
    display: flex;
    align-items: center;
  }
  .cursor {
    cursor: pointer;
  }
  .gray {
    color: #999;
  }
  .mr-10 {
    margin-right: 10px;
  }
  .list-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: 25px;
    background: #ddd;
    color: #fff;
  }
  .title-area {
    .title {
      margin-bottom: 3px;
      color: #444;
    }
    span {
      font-size: 13px;
    }
  }
`;
export default RecordFile;
