import styled from 'styled-components';
import React, { useState, useCallback, useRef } from 'react';
import { FiSquare, FiMic, FiPause, FiCircle } from 'react-icons/fi';

const Record = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [time, setTime] = useState(0);

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);
    console.log(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
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
        // 2분(120초) 지나면 자동으로 녹음 중지
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

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob', { lastModified: new Date().getTime(), type: 'audio' });
    console.log(sound); // File 정보 출력
  }, [audioUrl]);

  return (
    <RecordBlock>
      <Recording>{onRec ? null : `REC`}</Recording>
      <Timer>{secToMin(time)}</Timer>
      <Buttons>
        <button onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? <FiMic /> : <FiPause />}</button>
        <button onClick={onSubmitAudioFile}>
          <FiSquare />
        </button>
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

const Recording = styled.p`
  position: absolute;
  top: 80px;
  right: 25%;
  display: flex;
  color: red;
  animation: blinker 1.5s linear infinite;
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
  /* p {
    margin-right: 5px;
  } */
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
