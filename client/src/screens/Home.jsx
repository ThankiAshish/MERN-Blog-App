import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Article from "./components/ArticleModel";

const Home = () => {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const response = await fetch(`api/article`);

      if (response.status === 200) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article) => (
          <Article
            key={article._id}
            id={article._id}
            cover={article.cover}
            title={article.title}
            summary={article.summary}
            author={article.author}
            date={article.updatedAt}
          />
        ))
      ) : (
        <div className="default-page">
          <h1>No articles found!</h1>
        </div>
      )}
    </>
  );
};

export default Home;
