import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import ArticlesService from "../service/articles";
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article";
import FormArticle from "./form-article";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getArticleDetail = async () => {
      dispatch(getArticleDetailStart());
      try {
        const response = await ArticlesService.getArticlesDetail(slug);
        dispatch(getArticleDetailSuccess(response.article));
        setTitle(response.article.title)
        setDescription(response.article.description)
        setBody(response.article.body)
      } catch (error) {
        console.log(error);
        getArticleDetailFailure(error);
      }
    };

    getArticleDetail();
  }, [slug]);

  const formSubmit = async e => {
    e.preventDefault()
    const article = { title, description, body }
    dispatch(postArticleStart())
    try {
      await ArticlesService.editArticle(slug, article)
      dispatch(postArticleSuccess())
      navigate('/')
    } catch (error) {
      dispatch(postArticleFailure())
    }
  }
  const formProps = { title, setTitle, description, setDescription, body, setBody, formSubmit }

  return (
    <div>
      <h2 className="text-center">Edit Article</h2>
      <div className="w-75 mx-auto ">
        <FormArticle {...formProps} />
      </div>
    </div>
  );
}

export default EditArticle