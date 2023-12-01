import React, { useState, useEffect } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const RecentArticles = () => {
  const [recentArticles, setRecentArticles] = useState([]);

  const fetchRecentArticles = async () => {
    try {
      const response = await axios.get('https://localhost:44392/api/Article/GetRecentArticles?count=5');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  useEffect(() => {
    // Make an API request to fetch recent articles
    fetchRecentArticles()
      .then(response => {
        // Assuming the response has a property "listArticle" containing the articles
        setRecentArticles(response.listArticle);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <div className='flex items-center justify-center py-20 lg:px-8 px-4'>
      <div className='max-w-[80rem]'>
      <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
      <ul>
      {recentArticles.map(article => (
          <li key={article.intArticleId}>
            <Link to={`/article/${article.intArticleId}`} className="h-full">
              <Card className="mt-5 shadow-none hover:bg-light-green-100">
                <CardBody className="flex flex-col lg:flex-row lg:h-72 gap-10 p-0">
                  <img
                  src={article.strPhotoUrl}
                    alt="card-image"
                    className="rounded-xl"
                  />
                  <div className="flex flex-col gap-3 justify-center px-5 pb-5 lg:p-0">
                    <Typography className="text-green font-bold uppercase">
                    {article.strCategory}
                    </Typography>
                    <Typography className="lg:text-3xl md:text-2xl text-xl font-semibold" color="black">
                    {article.strTitle}
                                        </Typography>
                    <Typography color="black">
                    {article.strDescription.length > 50
                        ? `${article.strDescription.substring(0, 200)}...`
                        : article.strDescription}                    </Typography>
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
  );
};