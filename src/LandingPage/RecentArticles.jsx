import React, { useState, useEffect } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const RecentArticles = () => {
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRecentArticles = async () => {
      try {
        const response = await axios.get('https://localhost:44392/api/Article/GetRecentArticles?count=5');
        if (isMounted) {
          if (response.data && response.data.listArticle) {
            const data = response.data;

            // Update the strPhotoUrls property with the server URL and extracted filenames
            const articles = data.listArticle.map(article => {
              const photoUrls = article.photos.map(photo => {
                const filename = photo.substring(photo.lastIndexOf('/') + 1);
                return `https://localhost:44392/ArticlePhotos/${filename}`;
              });

              return {
                ...article,
                strPhotoUrls: photoUrls
              };
            });

            setRecentArticles(articles);
            setLoading(false);
          } else {
            setError('Invalid response data');
            setLoading(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError(error.response ? error.response.data : error.message);
          setLoading(false);
        }
      }
    };

    fetchRecentArticles();

    return () => {
      isMounted = false; // Cleanup function to cancel ongoing requests
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator or message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

  return (
    <div className='flex items-center justify-center py-20 lg:px-8 px-4'>
      <div className='max-w-[80rem]'>
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        <ul>
          {recentArticles.map(article => (
            <li key={article.intArticleId} style={{ marginBottom: '10rem' }}>
              <Link to={`/article/${article.intArticleId}`} className="h-full">
                <Card className="mt-5 shadow-none hover:bg-light-green-100">
                  <CardBody className="flex flex-col lg:flex-row lg:h-72 gap-10 p-0">
                    <img
                      src={article.strPhotoUrls[0]} // Use the first photo URL from the array
                      alt="card-image"
                      style={{ width: '400px', height: '400px' }}
                      className="rounded-xl object-cover"
                    />
                    <div className="flex flex-col gap-3 justify-center px-5 pb-5 lg:p-0">
                      <Typography className="text-green font-bold uppercase">
                        {article.strCategory}
                      </Typography>
                      <Typography className="lg:text-3xl md:text-2xl text-xl font-semibold" color="black">
                        {article.strTitle}
                      </Typography>
                      <Typography color="black">
                        {article.strDescription.length > 200
                          ? `${article.strDescription.substring(0, 200)}...`
                          : article.strDescription}
                      </Typography>
                      <Typography className="font-medium text-light-gray">
                        {article.strWriter}
                      </Typography>
                      <Typography className="font-medium text-light-gray">
                        Publication Date:{article.publicationDate}
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