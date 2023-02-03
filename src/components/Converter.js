import React, { useState } from 'react';
import InputFile from './InputFile';
import { convertGifToMp4, convertGifToWebm } from '../utils/FFmpeg';
import ButtonConvertStyled from './styled/ButtonConvertStyled';
import Flex from './styled/Flex';
import AnchorDownloadStyled from './styled/AchorDownloadStyled';

function Converter() {
  const [mp4Url, setMp4Url] = useState('');
  const [mp4Filename, setMP4Filename] = useState('');
  const [webmUrl, setWebmUrl] = useState('');
  const [process, setProcess] = useState(false);
  const [webmFilename, setWebmFilename] = useState('');
  const [gif, setGif] = useState(null);

  const onInputFileChange = (file) => {
    if (file) {
      setGif(file);
      setMP4Filename(file.name.replace('.gif', '.mp4'));
      setWebmFilename(file.name.replace('.gif', '.webm'));
      setMp4Url('');
      setWebmUrl('');
    }
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
  };

  if (process) {
    return (
      <div>
        <InputFile inputFileChange={onInputFileChange} />
        <Flex>
          <ButtonConvertStyled disabled>Processing ...</ButtonConvertStyled>
        </Flex>
      </div>
    );
  }

  return (
    <div>
      <InputFile inputFileChange={onInputFileChange} />
      <Flex flexDirection="row" gap="10px">
        {mp4Url
          ? (
            <AnchorDownloadStyled
              href={mp4Url}
              download={mp4Filename}
            >
              Download MP4
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
