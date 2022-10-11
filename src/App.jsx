import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Record from './pages/Record';
import RecordList from './pages/RecordList';
import PlayAudio from './pages/PlayAudio';
import Header from './components/Header';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Record />} />
        <Route path='/list' element={<RecordList />} />
        <Route path='/play' element={<PlayAudio />} />
      </Routes>
    </>
  );
}

export default App;
