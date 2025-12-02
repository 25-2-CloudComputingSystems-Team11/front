import React, { useEffect, useState } from "react";
import { fetchNews } from "../api/newsApi";

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews();  // 실제 API에서 뉴스 불러오기
      setNews(data);
    };

    loadNews();
  }, []);

  return (
    <header className="news-section">
      <h2>🔥 오늘의 IT 뉴스</h2>

      <ul>
        {news.length > 0 ? (
          news.map((item, idx) => (
            <li key={idx}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))
        ) : (
          <li>뉴스를 불러오는 중...</li>
        )}
      </ul>
    </header>
  );
};

export default NewsSection;