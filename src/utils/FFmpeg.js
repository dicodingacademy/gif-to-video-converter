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

async function convertGifToMp4(file) {
  const { name } = file;
  const nameWithoutExtension = name.replace('.gif', '');
  const buffer = await getFileAsByteArray(file);
  ffmpeg.FS('writeFile', name, buffer);
  await ffmpeg.run('-i', name, `${nameWithoutExtension}.mp4`);
  return ffmpeg.FS('readFile', `${nameWithoutExtension}.mp4`);
}

async function convertGifToWebm(file) {
  const { name } = file;
  const nameWithoutExtension = name.replace('.gif', '');
  const buffer = await getFileAsByteArray(file);
  ffmpeg.FS('writeFile', name, buffer);
  await ffmpeg.run('-i', name, `${nameWithoutExtension}.webm`);
  return ffmpeg.FS('readFile', `${nameWithoutExtension}.webm`);
}

export { loadFFmpeg, convertGifToMp4, convertGifToWebm };
