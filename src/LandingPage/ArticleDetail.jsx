import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { Typography } from "@material-tailwind/react";
import { Footer } from "../Components/Footer";
import axios from "axios";

export const ArticleDetail = () => {
  const { intArticleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://localhost:44392/api/Article/GetArticleData/${intArticleId}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [intArticleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <NavigationBar />
      <div className="px-52 py-24 flex flex-col gap-5">
        <img
          src={article.listArticle[0].photos[0]?.strPhotoUrl || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
          alt="Article"
          className="w-full h-[500px] object-cover"
        />
        <Typography className="text-green font-bold uppercase">
          {article.listArticle[0].strCategory}
        </Typography>
        <Typography variant="h4" color="black">
          {article.listArticle[0].strTitle}
        </Typography>
        <Typography>{article.listArticle[0].strDescription}</Typography>
        <Typography>Published on: {article.listArticle[0].publicationDate}</Typography>
        <Typography className="font-medium text-black">
          Writer: {article.listArticle[0].strWriter}
        </Typography>
      </div>
      <Footer />
    </Fragment>
  );
};