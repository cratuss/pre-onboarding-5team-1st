import styled from 'styled-components';
import React, { useState, useCallback } from 'react';

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
      const mediaRecorder = newMediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      analyser.onaudioprocess = function (e) {
        setOnRec(false);
      };
    });
  };

  return (
    <>
      {/* <RecordBlock>Record</RecordBlock>; */}
      <button onClick={onRecAudio}>녹음</button>
      <button>결과 확인</button>
    </>
  );
};

// const RecordBlock = styled.div``;

export default Record;
