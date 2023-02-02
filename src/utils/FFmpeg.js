import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

async function loadFFmpeg() {
  await ffmpeg.load();
}

export { ffmpeg, loadFFmpeg };
