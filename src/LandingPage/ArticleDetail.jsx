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
        const response = await axios.get(
          `https://localhost:44392/api/Article/GetArticleData/${intArticleId}`
        );
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
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <Fragment>
      <NavigationBar />

      <div className="max-w-[80rem] mx-auto flex flex-col gap-5 py-16 lg:px-8 px-4">
        <Typography className="text-green font-bold uppercase">
          {article.listArticle[0].strCategory}
        </Typography>
        <Typography
          className="lg:text-3xl md:text-2xl text-xl font-semibold"
          color="black"
        >
          {article.listArticle[0].strTitle}
        </Typography>
        <div className="flex flex-wrap gap-4">
          {article.listArticle[0].photos.map((photoUrl, index) => (
            <div key={index}>
              {photoUrl.toLowerCase().endsWith('.mp4') ? (
                <video
                  src={photoUrl}
                  alt="Article"
                  style={{ width: '400px', height: '400px' }}
                  className="object-cover rounded-xl"
                  controls
                />
              ) : (
                <img
                  src={photoUrl}
                  alt="Article"
                  style={{ width: '400px', height: '400px' }}
                  className="object-cover rounded-xl"
                />
              )}
            </div>
          ))}
        </div>
        

        <Typography color="black" style={{ lineHeight: '2', whiteSpace: 'pre-line' }}>
          {article.listArticle[0].strDescription}
        </Typography>
        <Typography>
          Published on:{" "}
          <span className="font-medium">
            {article.listArticle[0].publicationDate}
          </span>
        </Typography>
        <Typography className="text-black">
          Writer:{" "}
          <span className="font-medium">
            {article.listArticle[0].strWriter}
          </span>
        </Typography>
        <Typography className="text-black">
          Volume:{" "}
          <span className="font-medium">
            {article.listArticle[0].strVolume}
          </span>
        </Typography>
      </div>
      <Footer />
    </Fragment>
  );

};