import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "react-quill/dist/quill.snow.css";

const Article = () => {
  const [article, setArticle] = useState(null);

  const { id } = useParams();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`/api/article/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setArticle(data);
      } else {
        toast.error("Error fetching article");
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <>
      {article ? (
        <div className="open-article">
          <div className="article-header">
            <h1>{article.title}</h1>
            <div className="article-info">
              <div className="article-author">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${article.author.username}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                  alt={`${article.author.username} avatar`}
                />
                <p>{article.author.username}</p>
              </div>
              <p>{formatDate(article.createdAt)}</p>
            </div>
            <img
              src={`${import.meta.env.VITE_APP_API_URL}/${article.cover.slice(
                7,
                article.cover.length
              )}`}
              alt={`${article.title} cover`}
            />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      ) : (
        <div className="default-page">
          <h1>No article found!</h1>
        </div>
      )}
    </>
  );
};

export default Article;
