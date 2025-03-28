import { root } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import { App } from './App.jsx';
import Profiling from './pages/Profiling.jsx';
import Login from './pages/Login.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import Quiz from './pages/Quiz.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import DiagnosticResult from './pages/DiagnosticResult.jsx';
import Home from './pages/Home.jsx';
import Layout from './shared/Layout.jsx';
import Profile from './pages/Profile.jsx';
import Subject from './pages/Subject.jsx';

root.render(
  <ThemeProvider>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profiling" element={<Profiling />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/diagnostic-result" element={<DiagnosticResult />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subject" element={<Subject />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </ThemeProvider>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
