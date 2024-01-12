import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Option, Select, Typography, Card, CardBody } from '@material-tailwind/react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { LiteraryStaffSidebarComponents } from '../Components/LiteraryStaffSidebarComponents';


export const LiteraryStaffEditArticles = () => {
  const { intArticleId } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [previousPhotos, setPreviousPhotos] = useState([]);
  const [newArticle, setNewArticle] = useState({
    photos: [],
  });
  const [articleData, setArticleData] = useState({
    strTitle: '',
    strCategory: '',
    strDescription: '',
    strWriter: '',
    strFeedback: '',
    strVolume: '',
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
          strVolume: article.strVolume,
          strFeedback: article.strFeedback,
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

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedPhotos = Array.from(files);

    const uploadedPhotosWithData = uploadedPhotos.map((file) => {
      const fileType = file.type.split('/')[0]; // Get the file type (e.g., image, video)
      const preview = URL.createObjectURL(file); // Generate the preview URL for the file

      return {
        file: file,
        preview: preview,
        type: fileType,
      };
    });

    setNewArticle((prevNewArticle) => ({
      ...prevNewArticle,
      photos: uploadedPhotosWithData,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedArticleData = {
      ...articleData,
      photos: articleData.photos.map((photo) => photo.url),
    };

    console.log(formattedArticleData);

    axios
      .put(`https://localhost:44392/api/Article/EditArticle/${intArticleId}`, formattedArticleData)
      .then((response) => {
        console.log('Article data updated:', response.data);

        setSuccessMessage('Changes saved successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        setArticleData({
          strTitle: '',
          strCategory: '',
          strDescription: '',
          strWriter: '',
          strVolume: '',
          strFeedback: '',
          publicationDate: new Date(),
          photos: [],
        });
        setNewArticle({
          photos: [],
        });
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


  const handleRemovePhoto = (index) => {
    setArticleData((prevArticleData) => {
      const updatedPhotos = prevArticleData.photos.filter((_, i) => i !== index);
      const removedPhoto = prevArticleData.photos[index];
      URL.revokeObjectURL(removedPhoto.preview);
      return { ...prevArticleData, photos: updatedPhotos };
    });

    setNewArticle((prevNewArticle) => {
      const updatedPhotos = prevNewArticle.photos.filter((_, i) => i !== index);
      const removedPhoto = prevNewArticle.photos[index];
      URL.revokeObjectURL(removedPhoto.preview);
      return { ...prevNewArticle, photos: updatedPhotos };
    });
  };

  return (
    <Fragment>
      <LiteraryStaffSidebarComponents />
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
            <textarea
              label="Title"
              name="strTitle"
              value={articleData.strTitle}
              onChange={handleInputChange}
              placeholder="Title"
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
            />
              <textarea
                label="Description"
                name="strDescription"
                value={articleData.strDescription}
                onChange={handleInputChange}
                placeholder="Description"
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:border-indigo-500"
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
              <Input
                label="Volume"
                type="text"
                name="strVolume"
                value={articleData.strVolume}
                onChange={handleInputChange}
                placeholder="Volume"
              />
              <Input
                label="Feedback"
                type="text"
                name="strFeedback"
                value={articleData.strFeedback}
                onChange={handleInputChange}
                placeholder="Feedback"
              />
              <div class="flex flex-wrap mt-500"></div>
              {articleData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  {photo.type === 'image' ? (
                    <img
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="w-500 h-500 object-cover rounded mr-2 mb-2"
                    />
                  ) : photo.type === 'video' ? (
                    <video
                      src={photo.url}
                      alt={`Video ${index + 1}`}
                      className="w-500 h-500 object-cover rounded mr-2 mb-2"
                      controls
                    />
                  ) : null}
                  <button
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white text-xs"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="flex flex-wrap mt-2"></div>
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

                  {/* Display newArticle */}
                  {newArticle.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      {photo.type === 'image' ? (
                        <img
                          src={photo.preview}
                          alt={`New Photo ${index + 1}`}
                          className="w-500 h-500 object-cover rounded mr-2 mb-2"
                        />
                      ) : photo.type === 'video' ? (
                        <video
                          src={photo.url}
                          alt={`Video ${index + 1}`}
                          className="w-500 h-500 object-cover rounded mr-2 mb-2"
                          controls
                        />
                      ) : null}
                      {/* ... */}
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