import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import Modal from "react-modal";

import "react-quill/dist/quill.snow.css";
import { isAuth } from "../helpers/auth";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "150px",
    width: "300px",
    background: "#232C33",
    transform: "translate(-50%, -50%)",
  },
};

const Article = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const { id } = useParams();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/article/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${isAuth().token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Article deleted successfully");
        closeModal();
        setArticle(null);
        navigate("/");
      } else {
        toast.error("Error deleting article");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/article/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setArticle(data);
        } else {
          toast.error("Error fetching article");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-body">
          <h2>Are you Sure?</h2>
          <div className="btn-container">
            <button className="btn btn-delete" onClick={handleDelete}>
              Yes
            </button>
            <button className="btn btn-outline" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </Modal>
      {isLoading ? (
        <div className="default-page">
          <SyncLoader color="#826AED" />
        </div>
      ) : article ? (
        <div className="open-article">
          <div className="article-header open">
            <div className="article-title">
              <h1>{article.title}</h1>
            </div>
            {isAuth() && article.author._id === isAuth().id && (
              <div className="btn-container">
                <Link
                  to={`/edit-article/${article._id}`}
                  className="btn btn-outline"
                >
                  Edit
                </Link>
                <button className="btn btn-delete" onClick={openModal}>
                  Delete
                </button>
              </div>
            )}
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
