import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './css/GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './templates/HomePage/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <GlobalStyle />
    <Routes>
      {/* <Route path="*" element={<ErrorPage />} /> */}
      <Route path="/" element={<HomePage />} />
    </Routes>
</BrowserRouter>
);