import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../Components/Sidebar';
import { Button, Input, Select, Typography, Card, CardBody } from '@material-tailwind/react';
import { articlesData } from '../Utils/Data';


export const EditArticle = () => {
  const { articleId } = useParams();
  const [successMessage, setSuccessMessage] = useState('');

  const getUserData = () => {
    const article = articlesData.find((article) => article.id.toString() === articleId);
    return article || { title: '', category: '', description: '', writer: '', publicationDate: '' };
  };

  const [articleData, setArticleData] = useState(getArticleData());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update the user data in your data source or API
    console.log('Article data updated:', articleData);

    // Simulating a successful save
    setSuccessMessage('Changes saved successfully');
    // Reset the success message after a few seconds (adjust the timeout as needed)
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    const fetchData = () => {
      const article = getArticleData();
      setArticleData(user);
    };

    fetchData();
  }, [articleId]);

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <div class="flex justify-between">
        <Typography variant="h2">Edit Article</Typography>
        {successMessage && (
              <Typography className="text-green font-bold mt-3" variant="body2">
                {successMessage}
              </Typography>
            )}
            </div>
        <Card>
          <CardBody>
            <Typography className="mb-5 text-xl font-semibold">User Information</Typography>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input type="text" name="title" value={articleData.title} onChange={handleInputChange} placeholder="Title" />
              <Select name="category" value={articleData.category} onChange={handleInputChange} placeholder="Category">
                <option value="News">News</option>
                <option value="Feature">Feature</option>
                <option value="Opinion">Opinion</option>
                <option value="Literary">Literary</option>
                <option value="Sports">Sports</option>
                <option value="Developmental Communication">Developmental Communication</option>
              </Select>
              <Input type="text" name="writer" value={articleData.writer} onChange={handleInputChange} placeholder="Writer" />
             
              <Button type="submit" className="w-fit self-end">
                Save Changes
              </Button>
            </form>
           
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};
