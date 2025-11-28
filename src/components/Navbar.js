import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🚀 Dev-Helper
      </div>

      <ul className="navbar-menu">
        <li>서비스 소개</li>
        <li>개발자 커뮤니티</li>
        <li>로그인</li>
      </ul>
    </nav>
  );
};

export default Navbar;
