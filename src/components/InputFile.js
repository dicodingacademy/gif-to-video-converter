import React, { useRef, useState } from 'react';
import { convertGifToMp4, convertGifToWebm } from '../utils/FFmpeg';

function InputFile() {
  const [loading, setLoading] = useState(false);
  const [mp4Url, setMp4Url] = useState('');
  const [webmUrl, setWebmUrl] = useState('');

  const inputFile = useRef(null);

  const convertToMp4 = async () => {
    setLoading(true);
    const [file] = inputFile.current.files;
    const mp4Buffer = await convertGifToMp4(file);
    const blob = new Blob([mp4Buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    setLoading(false);
    setMp4Url(url);
  };

  const convertToWebm = async () => {
    setLoading(true);
    const [file] = inputFile.current.files;
    const webmBuffer = await convertGifToWebm(file);
    const blob = new Blob([webmBuffer], { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setLoading(false);
    setWebmUrl(url);
  };

  return (
    <>
      <div>
        <input type="file" accept="image/gif" ref={inputFile} />
        <button type="button" onClick={convertToMp4}>Convert MP4</button>
        <button type="button" onClick={convertToWebm}>Convert Webm</button>
      </div>
      {loading && <p>On process! Do not close window</p>}
      {mp4Url && <p><a href={mp4Url} download>Download MP4</a></p>}
      {webmUrl && <p><a href={webmUrl} download>Download Webm</a></p> }
    </>
  );
}

export default InputFile;
