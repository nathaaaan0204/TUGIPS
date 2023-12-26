import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Option, Select, Typography, Card, CardBody } from '@material-tailwind/react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { SidebarComponent } from '../Components/SidebarComponent';

export const EditArticle = () => {
  const { intArticleId } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [articleData, setArticleData] = useState({
    strTitle: '',
    strCategory: '',
    strDescription: '',
    strWriter: '',
    publicationDate: new Date(),
    photos: [],
  });

  const getArticleData = async () => {
    try {
      const response = await axios.get(`https://localhost:44392/api/Article/GetArticleData/${intArticleId}`);
      const { listArticle } = response.data;
      if (listArticle.length > 0) {
        const article = listArticle[0];
        const publicationDate = new Date(article.publicationDate); // Convert to Date object
        setArticleData((prevArticleData) => ({
          ...prevArticleData,
          strTitle: article.strTitle,
          strCategory: article.strCategory,
          strDescription: article.strDescription,
          strWriter: article.strWriter,
          publicationDate: new Date(article.publicationDate),
          photos: article.photos.map((photo) => ({ url: photo })),
        }));
      } else {
        setErrorMessage('No article data found');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch article data');
      setSuccessMessage('');
    }
  };
  const [newArticle, setNewArticle] = useState({
    photos: [],
  });
  const handleDateChange = (date) => {
    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      publicationDate: date,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      [name]: value,
    }));
  };
  const handleRemovePhoto = (index) => {
    setArticleData((prevArticleData) => {
      const updatedPhotos = prevArticleData.photos.filter((_, i) => i !== index);
      return { ...prevArticleData, photos: updatedPhotos };
    });
  };
  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedPhotos = Array.from(files);

    const uploadedPhotosWithData = uploadedPhotos.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));
    const photoUrls = uploadedPhotosWithData.map((photo) => photo.url.replace(/^blob:/, ""));

    setArticleData((prevArticle) => ({
      ...prevArticle,
      photos: prevArticle.photos.concat(uploadedPhotosWithData),
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedArticleData = {
      ...articleData,
    };

    axios
      .put(`https://localhost:44392/api/Article/EditArticle/${intArticleId}`, formattedArticleData)
      .then((response) => {
        console.log('Article data updated:', response.data);

        setSuccessMessage('Changes saved successfully');
        setTimeout(() => {
          setSuccessMessage('');
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
      <SidebarComponent />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col gap-10">
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
            <Typography className="mb-5 text-xl font-semibold">Article Information</Typography>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Title"
                type="text"
                name="strTitle"
                value={articleData.strTitle}
                onChange={handleInputChange}
                placeholder="Title"
              />
              <Input
                label="Description"
                type="text"
                name="strDescription"
                value={articleData.strDescription}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <Input
                label="Writer"
                type="text"
                name="strWriter"
                value={articleData.strWriter}
                onChange={handleInputChange}
                placeholder="Writer"
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Publication Date</label>
                <DatePicker
                  selected={articleData.publicationDate}
                  onChange={handleDateChange}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <Select
                label="Select a Category"
                value={articleData.strCategory}
                onChange={(e) => handleInputChange({ target: { name: 'strCategory', value: e.target.value } })}
                placeholder="Select a category"
              >
                <Option value="News">News</Option>
                <Option value="Feature">Feature</Option>
                <Option value="Opinion">Opinion</Option>
                <Option value="Literary">Literary</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Developmental Communication">Developmental Communication</Option>
              </Select>
              {articleData.photos && articleData.photos.length > 0 && (
                <>
                  {articleData.photos.map((photo, index) => (
                    <div key={index}>
                      <img src={photo.url} alt="Article Photo" />
                      <Button
                        onClick={() => handleRemovePhoto(index)}
                        color="red"
                        size="regular"
                        rounded={true}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </>
              )}

              <input
                type="file"
                id="photos"
                label="Photos"
                multiple
                onChange={(event) => handlePhotoUpload(event)}
              />

              <div className="mt-4">
                <Typography variant="h6">Selected Photos:</Typography>
                <div className="flex flex-wrap mt-2">
                  {newArticle.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo.preview}
                        alt={`Photo ${index + 1}`}
                        className="w-24 h-24 object-cover rounded mr-2 mb-2"
                      />
                      <button
                        className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white text-xs"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="bg-green sm:w-[200px] w-full self-end">
                Save Changes
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};