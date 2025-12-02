export const fetchNews = async () => {
  const res = await fetch("http://localhost:30080/news");
  const data = await res.json();
  return data.data; // 뉴스 리스트만 반환
};
