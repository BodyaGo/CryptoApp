import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

function News() {
  const [news, setNews] = useState([]);

  

  useEffect(() => {
    axios.get('https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=d1d04441a6c2484e8afb78e9b67e9255')
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest News</h2>
      <div className="row justify-content-center">
        {news.map((article, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <Card>
              <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer">Read more</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
