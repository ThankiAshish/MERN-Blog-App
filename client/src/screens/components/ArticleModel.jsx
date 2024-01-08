import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Article = ({ id, cover, title, summary, author, date }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTitle = (title) => {
    const maxLength = 50;
    return title.length > maxLength
      ? title.substring(0, maxLength - 3) + "..."
      : title;
  };

  const formatSummary = (summary) => {
    const maxLength = 100;
    return summary.length > maxLength
      ? summary.substring(0, maxLength - 3) + "..."
      : summary;
  };

  return (
    <Link to={`/article/${id}`} replace={true} state={{ id }}>
      <article className="article">
        <div className="article-image">
          <img
            src={`${import.meta.env.VITE_APP_API_URL}/${cover.slice(
              7,
              cover.length
            )}`}
            alt={`${title} cover`}
          />
        </div>
        <div className="article-text">
          <div className="article-title">
            <h3>{formatTitle(title)}</h3>
            <p className="article-date">&#128336;&nbsp;{formatDate(date)}</p>
          </div>
          <div className="article-summary">{formatSummary(summary)}</div>
          <div className="article-author">
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${author.username}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
              alt={`${author.username} avatar`}
            />
            <p>{author.username}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

Article.propTypes = {
  id: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default Article;
