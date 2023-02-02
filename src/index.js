import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadFFmpeg } from './utils/FFmpeg';
import App from './App';

(async () => {
  const root = createRoot(document.getElementById('root'));

  await loadFFmpeg();

  root.render(<App />);
})();
