import React, { Fragment } from 'react';
import { articlesData } from '../Utils/Data';
import { NavigationBar } from '../Components/NavigationBar';
import { Link } from 'react-router-dom';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { Footer } from '../Components/Footer';

export const Feature = ({ articles }) => {
  // Filter the articles array to get only articles with the "Sports" category
  const featureArticles = articlesData.filter((article) => article.category === 'Feature');

  return (
    <Fragment>
      <NavigationBar/>
      <div className="bg-green text-white pt-40 pb-20 text-center">
      <Typography className="text-6xl font-medium">Feature</Typography>
    </div>
      <div className="px-52 py-24">
      <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
      <ul>
        {featureArticles.map((article) => (
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
    <Footer/>
    </Fragment>
  );
};
