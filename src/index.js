import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/styled/GlobalStyle';

(async () => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <>
      <GlobalStyle />
      <App />
    </>,
  );
})();
