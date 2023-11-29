import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { NavigationBar } from '../Components/NavigationBar';
import { Link } from 'react-router-dom';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Footer } from '../Components/Footer';

export const Sports = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://localhost:44392/api/Article/GetArticles');
        const allArticles = response.data.listArticle;
        const developmentalCommunicationArticles = allArticles.filter(
          (article) => article.strCategory === 'Sports'
        );
        setArticles(developmentalCommunicationArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return (
      <Fragment>
        <NavigationBar />
        <div className="text-center py-20">
          <Typography>No articles available.</Typography>
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <NavigationBar />
      <div className="bg-green text-white pt-40 pb-20 text-center">
        <Typography className="text-6xl font-medium">SPORTS</Typography>
      </div>
      <div className="px-52 py-24">
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        <ul>
          {articles
            .filter((article) => article.strCategory === 'Sports')
            .map((article) => (
              <li key={article.intArticleId}>
                <Link to={`/article/${article.intArticleId}`} className="">
                  <Card className="mt-5 shadow-none hover:bg-light-green-100">
                    <CardBody className="flex flex-row h-72 gap-10 p-0">
                      <img src={article.photos} alt="card-image" className="rounded-xl" />
                      <div className="flex flex-col gap-3 justify-center">
                        <Typography className="text-green font-bold uppercase">
                          {article.strCategory}
                        </Typography>
                        <Typography variant="h4" color="black">
                          {article.strTitle}
                        </Typography>
                        <Typography color="black">
                          {article.strDescription.length > 50
                            ? `${article.strDescription.substring(0, 200)}...`
                            : article.strDescription}
                        </Typography>
                        <Typography className="font-medium text-light-gray">{article.strWriter}</Typography>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Footer />
    </Fragment>
  );
};