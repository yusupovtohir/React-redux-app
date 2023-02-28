import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleFailure, getArticleStart, getArticleSuccess } from "../slice/article";
import { Loader } from '../ui'
import ArticlesService from "../service/articles";
import ArticleCard from "./article-card";


const Main = () => {
  const { articles, isLoading } = useSelector((state) => state.article);

  const dispatch = useDispatch()

  const getArticles = async () => {
    dispatch(getArticleStart())
    try {
      const response = await ArticlesService.getArticles()
      dispatch(getArticleSuccess(response.articles))
    } catch (error) {
      dispatch(getArticleFailure(error))
    }
  }

  useEffect(() => {
    getArticles()
  }, [])
  return (
    <div className="album py-5">
      <div>
        {isLoading && <Loader />}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {articles.map((item, i) => (
            <ArticleCard item={item} i={i} getArticles={getArticles} key={item.slug}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
