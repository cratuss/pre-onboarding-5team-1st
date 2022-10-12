import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';

import { FiFolder } from 'react-icons/fi';
import { FiPlayCircle } from 'react-icons/fi';
import { FiMic } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const HEADER_TITLES = [
    { path: '/', title: '녹음', nav: '목록', link: '/list', title_icon: <FiMic /> },
    { path: '/list', title: '목록', nav: '녹음', link: '/', title_icon: <FiFolder /> },
    { path: '/play', title: '재생', nav: '', link: '', title_icon: <FiPlayCircle /> },
  ];

  const matchedTitle = HEADER_TITLES.filter(data => location.pathname === data.path);
  console.log('경로', matchedTitle);
  return (
    <HeaderBlock>
      <div className='title-area d-flex'>
        {location.pathname !== '/' && (
          <FiArrowLeft
            className='curser'
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        <div className='ml-15 d-flex'>
          <p>{matchedTitle[0].title}</p>
          <span>{matchedTitle[0].title_icon}</span>
        </div>
      </div>
      {(
        <div
          className='nav curser d-flex'
          onClick={() => {
            navigate(matchedTitle[0].link);
          }}
        >
          {matchedTitle[0].nav}
        </div>
      ) || ''}
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 640px;
  padding: 18px 16px;
  color: #333;
  font-size: 18px;
  background: #fff;
  box-shadow: 0 5px 5px -5px #ddd;
  .d-flex {
    display: flex;
    align-items: center;
  }
  .ml-15 {
    margin-left: 15px;
  }
  .curser {
    cursor: pointer;
  }
  .title-area {
    display: inline-flex;
    svg {
      margin-left: 5px;
      vertical-align: bottom;
      font-size: 18px;
      color: #666;
    }
  }
  .nav {
    font-size: 16px;
  }
`;

export default Header;
