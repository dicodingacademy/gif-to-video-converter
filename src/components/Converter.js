import React, { useState } from 'react';
import InputFile from './InputFile';
import { convertGifToMp4, convertGifToWebm } from '../utils/FFmpeg';
import ButtonConvertStyled from './styled/ButtonConvertStyled';
import Flex from './styled/Flex';
import AnchorDownloadStyled from './styled/AchorDownloadStyled';
import OptionsSize from './OptionsSize';

function Converter() {
  const [mp4Url, setMp4Url] = useState('');
  const [mp4Filename, setMP4Filename] = useState('');
  const [mp4FileSize, setMp4FileSize] = useState(0);
  const [webmUrl, setWebmUrl] = useState('');
  const [webmFilename, setWebmFilename] = useState('');
  const [webmFileSize, setWebmFileSize] = useState(0);
  const [process, setProcess] = useState(false);
  const [gif, setGif] = useState(null);
  const [size, setSize] = useState('720');

  const convertBytes = (num) => {
    const suffixes = ['bytes', 'KB', 'MB', 'GB'];
    let index = Math.floor(Math.log(num) / Math.log(1024));
    index = Math.max(0, Math.min(index, suffixes.length - 1));
    return `${(num / 1024 ** index).toFixed(1)} ${suffixes[index]}`;
  };

  const onInputFileChange = (file) => {
    if (file) {
      setGif(file);
      setMP4Filename(file.name.replace('.gif', '.mp4'));
      setWebmFilename(file.name.replace('.gif', '.webm'));
      setMp4Url('');
      setWebmUrl('');
    }
  };

  const onSizeChange = (value) => {
    setSize(value);
  };

  const onConvertGifToMp4 = async () => {
    if (!gif) {
      return;
    }

    setProcess(true);
    const mp4Buffer = await convertGifToMp4(gif);
    const blob = new Blob([mp4Buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    setProcess(false);
    setMp4Url(url);
    setMp4FileSize(blob.size);
  };

  const onConvertGifToWebm = async () => {
    if (!gif) {
      return;
    }

    setProcess(true);
    const webmBuffer = await convertGifToWebm(gif);
    const blob = new Blob([webmBuffer], { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setProcess(false);
    setWebmUrl(url);
    setWebmFileSize(blob.size);
  };

  if (process) {
    return (
      <div>
        <InputFile disabled inputFileChange={onInputFileChange} />
        <OptionsSize sizeChange={onSizeChange} size={size} />
        <Flex>
          <ButtonConvertStyled disabled>Processing ...</ButtonConvertStyled>
        </Flex>
      </div>
    );
  }

  return (
    <div>
      <InputFile inputFileChange={onInputFileChange} />
      <OptionsSize sizeChange={onSizeChange} size={size} />
      <Flex flexDirection="row" gap="10px">
        {mp4Url
          ? (
            <AnchorDownloadStyled
              href={mp4Url}
              download={mp4Filename}
            >
              Download MP4
              <br />
              (
              {convertBytes(mp4FileSize)}
              )
            </AnchorDownloadStyled>
          )
          : (
            <ButtonConvertStyled
              onClick={onConvertGifToMp4}
              type="button"
              disabled={!gif}
            >
              Convert to MP4
            </ButtonConvertStyled>
          )}
        {webmUrl ? (
          <AnchorDownloadStyled
            href={webmUrl}
            download={webmFilename}
          >
            Download WEBM
            <br />
            (
            {convertBytes(webmFileSize)}
            )
          </AnchorDownloadStyled>
        )
          : (
            <ButtonConvertStyled
              onClick={onConvertGifToWebm}
              type="button"
              disabled={!gif}
            >
              Convert to WEBM
            </ButtonConvertStyled>
          )}
      </Flex>
    </div>
  );
}

export default Converter;
