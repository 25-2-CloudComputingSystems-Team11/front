import React from 'react';

const NewsSection = () => {
  const fakeNews = [
    { id: 1, title: '"AGI 시대 5년 남았다" 인공 일반 지능이란?', url: '#' },
    { id: 2, title: '생성형 AI 둘러싼 구글의 딜레마', url: '#' },
    { id: 3, title: '상반기 개발자 채용 시장 동향', url: '#' }
  ];

  return (
    <header className="news-section">
      <h2>🔥 오늘의 IT 뉴스</h2>
      <ul>
        {fakeNews.map(({ id, title, url }) => (
          <li key={id}>
            <a href={url}>{title}</a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default NewsSection;
