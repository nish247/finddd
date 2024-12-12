import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Upload = () => {
const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('ファイルを選択してください');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('アップロード成功:', response.data);
    } catch (error) {
      console.error('アップロードエラー:', error);
    }
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div>
      <label htmlFor="contained-button-file">
        <Input
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
          accept=".wav"
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          WAV ファイルを選択
        </Button>
      </label>
      {file && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          選択されたファイル: {file.name}
        </Typography>
      )}
      {file && (
        <Button
        variant="contained"
        onClick={handleUpload}
        sx={{ mt: 2 }}
        disabled={!file}
        >
        アップロード
        </Button>
      )}
    </div>
  );
};

export default Upload;