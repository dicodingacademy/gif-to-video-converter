import React, { useState } from 'react';
import InputFile from './InputFile';
import { convertGifToMp4, convertGifToWebm } from '../utils/FFmpeg';

function Converter() {
  const [mp4Url, setMp4Url] = useState('');
  const [webmUrl, setWebmUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [gif, setGif] = useState(null);

  const onInputFileChange = (file) => {
    if (file) {
      setGif(file);
    }
  };

  const onConvertGifToMp4 = async () => {
    setLoading(true);
    const mp4Buffer = await convertGifToMp4(gif);
    const blob = new Blob([mp4Buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    setLoading(false);
    setMp4Url(url);
  };

  const onConvertGifToWebm = async () => {
    setLoading(true);
    const webmBuffer = await convertGifToWebm(gif);
    const blob = new Blob([webmBuffer], { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setLoading(false);
    setWebmUrl(url);
  };

  return (
    <div>
      <InputFile inputFileChange={onInputFileChange} />

      <button onClick={onConvertGifToMp4} type="button">Convert to MP4</button>
      <button onClick={onConvertGifToWebm} type="button">Convert to Webm</button>

      {loading && <p>On process! Do not close window</p>}
      {mp4Url && <p><a href={mp4Url} download>Download MP4</a></p>}
      {webmUrl && <p><a href={webmUrl} download>Download Webm</a></p> }
    </div>
  );
}

export default Converter;
