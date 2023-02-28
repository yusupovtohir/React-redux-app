import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import ArticlesService from "../service/articles";

const ArticleCard = ({ item, getArticles }) => {
  const navigate = useNavigate()
  const { loggedIn, user } = useSelector((state) => state.auth);

  const deleteArticle = async slug => {
    try {
      await ArticlesService.deleteArticle(slug)
      getArticles()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="col">
      <div className="card h-100 shadow-sm ">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
        </svg>

        <div className="card-body">
          <p className="card-text fw-bold">{item.title.slice(0, 70)}</p>
          <p>{item.description.slice(0, 100)}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => navigate(`/article/${item.slug}`)}
            >
              View
            </button>
            {loggedIn && user.username == item.author.username && (
              <>

                <button onClick={() => navigate(`/edit-article/${item.slug}`)} type="button" className="btn btn-sm btn-outline-secondary">
                  Edit
                </button>
                <button
                  type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteArticle(item.slug)} >
                  Delete
                </button>
              </>
            )}

          </div>
          <small className="text-muted fw-bold text-capitalize">
            {item.author.username}
          </small>
        </div>

      </div>
    </div>
  )
}

export default ArticleCard