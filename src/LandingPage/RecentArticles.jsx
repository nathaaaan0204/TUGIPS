import React, { useState, useEffect } from 'react';
import { articlesData } from '../Utils/Data';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';


export const RecentArticles = () => {
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    // If using real backend data, replace the following with axios calls to your API endpoint.
    // In this example, we'll just use the dummy data for demonstration purposes.
    setRecentArticles(articlesData);
  }, []);

  return (
    <div className="px-52 py-24">
      <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
      <ul>
        {recentArticles.map((article) => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`} className="">
            <Card className="mt-5  shadow-none hover:bg-light-green-100">
      <CardBody className='flex flex-row  h-72 gap-10 p-0'>
      <img
          src={article.imagesrc}
          alt="card-image"
       className='rounded-xl'
        />
        <div className='flex flex-col gap-3 justify-center '>
       <Typography className="text-green font-bold uppercase">
          {article.category}
        </Typography>
        <Typography variant="h4" color="black">
          {article.title}
        </Typography>
        <Typography color="black">
  {article.description.length > 50 ? `${article.description.substring(0, 200)}...` : article.description}
</Typography>
        <Typography className="font-medium text-light-gray">
           {article.writer}
        </Typography>
        </div>
      
      </CardBody>
  
    </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

