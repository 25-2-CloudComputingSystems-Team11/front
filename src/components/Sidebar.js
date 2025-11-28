import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">📂 내 보관함</div>

      <ul className="sidebar-menu">
        <li className="active">✨ 새로운 채팅</li>
        <li>📅 11월 20일 면접 연습</li>
        <li>📅 11월 15일 이력서 첨삭</li>
        <li>📝 프로젝트 아이디어 메모</li>
      </ul>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">👩‍💻</div>
          <div className="user-info">
            <span className="name">김정은 님</span>
            <span className="role">프론트엔드 개발자</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
