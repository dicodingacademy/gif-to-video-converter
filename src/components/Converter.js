import React, { useState } from 'react';
import InputFile from './InputFile';
import { convertGifToMp4, convertGifToWebm } from '../utils/FFmpeg';
import ButtonConvertStyled from './styled/ButtonConvertStyled';
import Flex from './styled/Flex';
import AnchorDownloadStyled from './styled/AchorDownloadStyled';

function Converter() {
  const [mp4Url, setMp4Url] = useState('');
  const [mp4Process, setMp4Process] = useState(false);
  const [webmUrl, setWebmUrl] = useState('');
  const [webmProcess, setWebmProcess] = useState(false);
  const [gif, setGif] = useState(null);

  const onInputFileChange = (file) => {
    if (file) {
      setGif(file);
    }
  };

  const onConvertGifToMp4 = async () => {
    if (!gif) {
      return;
    }

    setMp4Process(true);
    const mp4Buffer = await convertGifToMp4(gif);
    const blob = new Blob([mp4Buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    setMp4Process(false);
    setMp4Url(url);
  };

  const onConvertGifToWebm = async () => {
    if (!gif) {
      return;
    }

    setWebmProcess(true);
    const webmBuffer = await convertGifToWebm(gif);
    const blob = new Blob([webmBuffer], { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setWebmProcess(false);
    setWebmUrl(url);
  };

  return (
    <div>
      <InputFile inputFileChange={onInputFileChange} />
      <Flex flexDirection="row" gap="10px">
        {mp4Url
          ? <AnchorDownloadStyled href={mp4Url}>Download MP4</AnchorDownloadStyled>
          : (
            <ButtonConvertStyled onClick={onConvertGifToMp4} type="button" disabled={!gif || mp4Process}>
              {mp4Process ? 'Processing ...' : 'Convert to MP4'}
            </ButtonConvertStyled>
          )}
        {webmUrl ? <AnchorDownloadStyled href={webmUrl}>Download Webm</AnchorDownloadStyled>
          : (
            <ButtonConvertStyled onClick={onConvertGifToWebm} type="button" disabled={!gif || webmProcess}>
              {webmProcess ? 'Processing ...' : 'Convert to Webm'}
            </ButtonConvertStyled>
          )}
      </Flex>
    </div>
  );
}

export default Converter;
