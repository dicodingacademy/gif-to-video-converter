import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

async function loadFFmpeg() {
  await ffmpeg.load();
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader();

    // Register event listeners
    reader.addEventListener('loadend', (e) => resolve(e.target.result));
    reader.addEventListener('error', reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

async function getFileAsByteArray(file) {
  return new Uint8Array(await readFile(file));
}

async function convertGifToMp4(file, { maxSize = 'original' }) {
  const { name } = file;
  const nameWithoutExtension = name.replace('.gif', '');
  const buffer = await getFileAsByteArray(file);
  ffmpeg.FS('writeFile', name, buffer);

  if (maxSize !== 'original') {
    await ffmpeg.run('-i', name, '-pix_fmt', 'yuv420p', '-vf', `scale='iw*min(${maxSize}/iw,1):-2', crop=iw:ih/2*2`, `${nameWithoutExtension}.mp4`);
    return ffmpeg.FS('readFile', `${nameWithoutExtension}.mp4`);
  }

  await ffmpeg.run('-i', name, '-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2:(iw-iw)/2:(ih-ih)/2', '-pix_fmt', 'yuv420p', `${nameWithoutExtension}.mp4`);
  return ffmpeg.FS('readFile', `${nameWithoutExtension}.mp4`);
}

async function convertGifToWebm(file, { maxSize = 'original' }) {
  const { name } = file;
  const nameWithoutExtension = name.replace('.gif', '');
  const buffer = await getFileAsByteArray(file);
  ffmpeg.FS('writeFile', name, buffer);

  if (maxSize !== 'original') {
    await ffmpeg.run('-i', name, '-vf', `scale=${maxSize}:-1`, `${nameWithoutExtension}.webm`);

    return ffmpeg.FS('readFile', `${nameWithoutExtension}.webm`);
  }

  await ffmpeg.run('-i', name, `${nameWithoutExtension}.webm`);
  return ffmpeg.FS('readFile', `${nameWithoutExtension}.webm`);
}

export { loadFFmpeg, convertGifToMp4, convertGifToWebm };
