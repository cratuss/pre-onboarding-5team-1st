import styled from 'styled-components';
import React, { useState, useCallback, useRef } from 'react';
import { FiSquare, FiMic, FiPause, FiCircle, FiStopCircle } from 'react-icons/fi';

const Record = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [time, setTime] = useState(0);

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);
    console.log(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        setTime(Math.trunc(e.playbackTime));
        if (e.playbackTime > 120) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  function secToMin(d) {
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const displayedTime = `${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`;
    return displayedTime;
  }

  const offRecAudio = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl));
    }
    const sound = new File([audioUrl], 'soundBlob', { lastModified: new Date().getTime(), type: 'audio' });
    console.log(sound);
  }, [audioUrl]);

  return (
    <RecordBlock>
      <Recording>
        {onRec ? null : (
          <div className='on-recording'>
            <p>REC</p>
            <FiCircle />
          </div>
        )}
      </Recording>
      <Timer>{secToMin(time)}</Timer>
      <Buttons>
        <button onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? <FiMic /> : <FiPause />}</button>
        <button onClick={onSubmitAudioFile}>save</button>
      </Buttons>
    </RecordBlock>
  );
};

const RecordBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 80px 16px 30px 16px;
`;

const Recording = styled.div`
  position: absolute;
  top: 80px;
  right: 25%;
  display: flex;
  color: red;
  .on-recording {
    display: flex;
  }
  p {
    margin-right: 5px;
  }
  animation: blinker 1.5s linear infinite;
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const Timer = styled.div`
  display: flex;
  align-items: center;
  font-size: 60px;
`;

const Buttons = styled.div`
  button {
    width: 70px;
    height: 70px;
    margin: auto 20px;
    border-radius: 100%;
    border: transparent;
    cursor: pointer;
  }
`;

export default Record;
