import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import { FiPlay, FiSquare, FiMic, FiPause } from 'react-icons/fi';

const Record = () => {
  const [stream, setStream] = useState();
  const [source, setSource] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const onRecAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

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
        setOnRec(false);
      };
    });
  };

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
    const sound = new File([audioUrl], 'soundblob', { lastModified: new Date().getTime(), type: 'audio' });
    console.log(sound);
  }, [audioUrl]);

  return (
    <RecordBlock>
      <button onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? <FiMic /> : <FiPause />}</button>
      <button onClick={onSubmitAudioFile}>
        <FiSquare />
      </button>
    </RecordBlock>
  );
};

const RecordBlock = styled.div`
  display: flex;
  /* justify-content: space-around; */
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 80px 16px 30px 16px;

  button {
    width: 70px;
    height: 70px;
    margin: auto 20px;
    border-radius: 100%;
    border: transparent;
  }
`;

export default Record;
