import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';

import RecordRTC from 'recordrtc';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const recorderRef = useRef<RecordRTC | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 44100
      });
      recorderRef.current.startRecording();
      setIsRecording(true);
    } catch (err) {
      console.error('録音の開始に失敗しました:', err);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
        setIsRecording(false);
      });
    }
  };

  const downloadRecording = () => {
    if (audioUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      downloadLink.download = 'recording.wav';
      downloadLink.click();
    }
  };

  return (
    <div>
      <Button variant='contained' onClick={isRecording ? stopRecording : startRecording} sx={{ marginBottom: 2 }}>
        {isRecording ? '停止' : '録音'}
      </Button>
      {audioUrl && (
        <>
          <audio controls src={audioUrl} />
          <Button variant='contained' onClick={downloadRecording} sx={{ marginBottom: 2 }}>ダウンロード</Button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;