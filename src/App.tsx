import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SocialMedia from './pages/SocialMedia/SocialMedia';
import PlaceholderPage from './pages/Placeholder';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a101e] text-[#fdfeff] font-sans selection:bg-[#ffd700] selection:text-[#0a101e]">
        {/* --- Overlay Background Gradient (Global) --- */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-yellow-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <Navbar />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Navigate to="/social-media" replace />} />
            <Route path="/social-media" element={<SocialMedia />} />
            
            {/* Placeholders for the other 5 sub-pages */}
            <Route path="/photography" element={<PlaceholderPage title="平面摄影" />} />
            <Route path="/3d-animation" element={<PlaceholderPage title="三维动画" />} />
            <Route path="/video-film" element={<PlaceholderPage title="视频影像" />} />
            <Route path="/3d-stills" element={<PlaceholderPage title="三维静态" />} />
            <Route path="/aigc" element={<PlaceholderPage title="AIGC" />} />

            {/* Other static pages */}
            <Route path="/about" element={<PlaceholderPage title="关于我" />} />
            <Route path="/resume" element={<PlaceholderPage title="简历" />} />
            <Route path="/blog" element={<PlaceholderPage title="博客" />} />
            <Route path="/contact" element={<PlaceholderPage title="联系我" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
