import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article";
import ArticlesService from "../service/articles";
import FormArticle from "./form-article";


const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const formSubmit = async e => {
    e.preventDefault()
    const article = { title, description, body }
    dispatch(postArticleStart())
    try {
      await ArticlesService.postArticle(article)
      dispatch(postArticleSuccess())
      navigate('/')
    } catch (error) {
      dispatch(postArticleFailure())
    }
  }

  const formProps = { title, setTitle, description, setDescription, body, setBody,  formSubmit}


  return (
    <div>
      <h2 className="text-center">Create Article</h2>
      <div className="w-75 mx-auto ">
        <FormArticle {...formProps} />
      </div>
    </div>
  );
};

export default CreateArticle;
