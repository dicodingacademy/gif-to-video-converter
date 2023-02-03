import React, { useEffect, useState } from 'react';
import { loadFFmpeg } from './utils/FFmpeg';
import Converter from './components/Converter';

function App() {
  const [preLoad, setPreload] = useState(true);

  useEffect(() => {
    (async () => {
      await loadFFmpeg();
      setPreload(false);
    })();
  }, []);

  if (preLoad) {
    return (
      <p>Loading</p>
    );
  }

  return (
    <Converter />
  );
}

export default App;
