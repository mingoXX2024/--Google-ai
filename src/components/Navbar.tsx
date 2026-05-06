import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const portfolioLinks = [
    { name: '平面摄影', link: '/photography' },
    { name: '三维动画', link: '/3d-animation' },
    { name: '视频影像', link: '/video-film' },
    { name: '三维静态', link: '/3d-stills' },
    { name: '社媒创意', link: '/social-media' },
    { name: 'AIGC', link: '/aigc' },
  ];

  return (
    <nav className="navbar w-full h-[80px] bg-[#0a101e] border-b-2 border-white/10 sticky top-0 z-[100] flex items-center justify-center">
      <div className="nav-menu flex gap-[40px]">
        <NavLink to="/" className={({ isActive }) => `text-[#fdfeff] no-underline text-[15px] font-medium uppercase transition-colors duration-300 hover:text-[#ffd700] ${isActive ? 'text-[#ffd700]' : ''}`}>首页</NavLink>
        <NavLink to="/about" className={({ isActive }) => `text-[#fdfeff] no-underline text-[15px] font-medium uppercase transition-colors duration-300 hover:text-[#ffd700] ${isActive ? 'text-[#ffd700]' : ''}`}>关于我</NavLink>
        <NavLink to="/resume" className={({ isActive }) => `text-[#fdfeff] no-underline text-[15px] font-medium uppercase transition-colors duration-300 hover:text-[#ffd700] ${isActive ? 'text-[#ffd700]' : ''}`}>简历</NavLink>
        
        <div className="nav-dropdown relative group inline-block">
          <span className="text-[#fdfeff] no-underline text-[15px] font-medium uppercase transition-colors duration-300 flex items-center gap-1 cursor-default group-hover:text-[#ffd700]">
            作品集
          </span>
          <div className="dropdown-content absolute top-full left-0 bg-[#0a0a18]/95 min-w-[180px] border-2 border-[#ffd700]/20 rounded-sm mt-[5px] shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-[1000]">
            {portfolioLinks.map((sub) => (
              <NavLink 
                key={sub.name} 
                to={sub.link}
                className={({ isActive }) => `block px-5 py-3 text-[13px] capitalize font-medium transition-all duration-300 border-b-2 border-[#ffd700]/10 last:border-none hover:bg-[#ffd700]/10 hover:pl-[25px] ${isActive ? 'text-[#ffd700]' : 'text-[#fdfeff] hover:text-[#ffd700]'}`}
              >
                {sub.name}
              </NavLink>
            ))}
          </div>
        </div>

        <NavLink to="/blog" className={({ isActive }) => `text-[#fdfeff] no-underline text-[15px] font-medium uppercase transition-colors duration-300 hover:text-[#ffd700] ${isActive ? 'text-[#ffd700]' : ''}`}>博客</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `text-[#fdfeff] no-underline text-[15px] font-medium uppercase transition-colors duration-300 hover:text-[#ffd700] ${isActive ? 'text-[#ffd700]' : ''}`}>联系我</NavLink>
      </div>
    </nav>
  );
}
