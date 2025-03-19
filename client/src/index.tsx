import { root } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import { App } from './App.jsx';
import Profiling from './pages/Profiling.jsx';
import Login from './pages/Login.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import Quiz from './pages/Quiz.jsx';

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profiling" element={<Profiling />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  </MemoryRouter>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
