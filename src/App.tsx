import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';

function App() {

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = []; // 録音データの初期化

    // マイクアクセスを要求
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    // データが得られるたびに保存
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    // 録音停止時にURLを生成
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      setIsRecording(false);
    };

    mediaRecorderRef.current.start();

    // 5秒後に録音停止
    const recordTime = 5000; // 5 seconds 
    setTimeout(() => {
      mediaRecorderRef.current.stop();
    }, recordTime);
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={startRecording} 
        disabled={isRecording}
      >
        {isRecording ? 'Recording...' : 'Start Recording'}
      </Button>

      {audioUrl && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  )
}

export default App
