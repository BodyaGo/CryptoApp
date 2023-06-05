import React, { useState, useEffect } from 'react';
import axios from 'axios';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=ua&category=business&apiKey=d1d04441a6c2484e8afb78e9b67e9255')
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      <div className="news-container">
        {news.map((article, index) => (
          <div className="news-block" key={index}>
            <img src={article.urlToImage} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
