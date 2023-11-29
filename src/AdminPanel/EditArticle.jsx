import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../Components/Sidebar';
import { Button, Input, Select, Typography, Card, CardBody } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

export const EditArticle = () => {
  const { intArticleId } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [articleData, setArticleData] = useState({
    strTitle: '',
    strCategory: '',
    strDescription: '',
    strWriter: '',
    publicationDate: '',

  });
  const getArticleData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:44392/api/Article/GetArticleData/${intArticleId}`
      );
      const { listArticle } = response.data;
      if (listArticle.length > 0) {
        const article = listArticle[0];
        setArticleData(article);
      } else {
        setErrorMessage('No article data found');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch article data');
      setSuccessMessage('');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://localhost:44392/api/Article/EditArticle/${intArticleId}`, articleData)
      .then((response) => {
        console.log("Article data updated:", response.data);

        setSuccessMessage("Changes saved successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getArticleData();
    };

    fetchData();
  }, [intArticleId]);
  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <div className="flex justify-between">
          <Typography variant="h2">Edit Article</Typography>
          {successMessage && (
            <Typography className="text-green font-bold mt-3" variant="body2">
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography className="text-red-500 font-bold mt-3" variant="body2">
              {errorMessage}
            </Typography>
          )}
        </div>
        <Card>
          <CardBody>
            <Typography className="mb-5 text-xl font-semibold">User Information</Typography>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input label="Title" type="text" name="strTitle" value={articleData.strTitle} onChange={handleInputChange} placeholder="Title" />
              <Input label="Category" type="text" name="strCategory" value={articleData.strCategory} onChange={handleInputChange} placeholder="Category" />
              <Input label="Description" type="text" name="strDescription" value={articleData.strDescription} onChange={handleInputChange} placeholder="Description" />
              <Input label="Writer" type="text" name="strWriter" value={articleData.strWriter} onChange={handleInputChange} placeholder="Writer" />
              <Input label="Publication Date" type="text" name="publicationDate" value={articleData.publicationDate} onChange={handleInputChange} placeholder="Publication Date" />
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