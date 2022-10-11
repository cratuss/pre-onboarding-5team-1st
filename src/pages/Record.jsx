import styled from 'styled-components';
import React, { useState, useCallback } from 'react';
import { FiPlay, FiSquare } from 'react-icons/fi';

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
    <RecordBlock>
      <button onClick={onRecAudio}>
        <FiPlay />
      </button>
      <button>
        <FiSquare />
      </button>
    </RecordBlock>
  );
};

const RecordBlock = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  max-width: 640px;
  padding-top: 100px;

  button {
    width: 70px;
    height: 70px;
    border-radius: 100%;
    border: transparent;
  }
`;

export default Record;
