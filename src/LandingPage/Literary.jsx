import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { NavigationBar } from "../Components/NavigationBar";
import { Link } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Footer } from "../Components/Footer";

export const Literary = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44392/api/Article/GetArticles"
        );
        const allArticles = response.data.listArticle;
        const LiteraryArticles = allArticles.filter(
          (article) => article.strCategory === "Literary"
        );
        setArticles(LiteraryArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return (
      <Fragment>
        <NavigationBar />
        <div className="text-center py-20 h-screen flex items-center justify-center">
          <Typography className="text-3xl">No articles available.</Typography>
        </div>
        <Footer />
      </Fragment>
    );
  }
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.strTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.strDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.strWriter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.strVolume.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.publicationDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <NavigationBar />
      <div className="bg-green text-white pt-40 pb-20 px-4 lg:px-8 text-center">
        <Typography className="text-6xl font-medium">Literary</Typography>
      </div>
      <div className="flex items-center justify-center py-20 lg:px-8 px-4">
        <div className="max-w-[80rem]">
          <h2 className="text-2xl font-bold mb-4">ARTICLES</h2>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <ul>
          {filteredArticles.map((article) => (
              <li key={article.intArticleId}>
                <Link to={`/article/${article.intArticleId}`} className="h-full">
                  <Card className="mt-5 shadow-none hover:bg-light-green-100">
                    <CardBody className="flex flex-col lg:flex-row lg:h-72 gap-10 p-0">
                      {article.strCategory === "Literary" && article.photos && article.photos.length > 0 ? (
                        <>
                          {typeof article.photos[0] === "string" &&
                            article.photos[0].toLowerCase().endsWith(".mp4") ? (
                            <video
                              key={article.intArticleId}
                              className="rounded-xl"
                              style={{ width: '400px', height: '400px' }}// Adjust the width and height as desired
                              controls
                            >
                              <source src={article.photos[0]} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={article.photos[0]}
                              alt="Article Image"
                              className="rounded-xl"
                              style={{ width: '400px', height: '400px' }} // Adjust the width and height as desired
                            />
                          )}
                        </>
                      ) : null}
                      <div className="flex flex-col gap-3 justify-center px-5 pb-5 lg:p-0">
                        <Typography className="text-green font-bold uppercase">
                          {article.strCategory}
                        </Typography>
                        <Typography
                          className="lg:text-3xl md:text-2xl text-xl font-semibold"
                          color="black"
                        >
                          {article.strTitle}
                        </Typography>
                        <Typography color="black">
                          {article.strDescription.length > 50
                            ? `${article.strDescription.substring(0, 200)}...`
                            : article.strDescription}
                        </Typography>
                        <Typography className="font-medium text-light-gray">
                          {article.strWriter}
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};