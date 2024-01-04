import ArticleImage from "../../assets/images/Article Image.jpg";

const Article = () => {
  return (
    <article className="article">
      <div className="article-image">
        <img src={ArticleImage} alt="" />
      </div>
      <div className="article-text">
        <div className="article-title">
          <h3>Article Title</h3>
          <p className="article-date">
            <span className="article-author">Article Author&nbsp;</span>Article
            Date
          </p>
        </div>
        <div className="article-content">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            odit quo quasi doloremque. Non ratione quo accusamus architecto
            cupiditate? Maxime iure itaque odit reprehenderit similique.
          </p>
        </div>
      </div>
    </article>
  );
};

export default Article;
