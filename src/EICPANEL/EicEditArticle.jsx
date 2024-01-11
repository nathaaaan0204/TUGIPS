import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { InputLabel, TextareaAutosize } from '@material-ui/core';

// Material-UI imports
import { Button, Input, Option, Select, Typography, Card, CardBody } from '@material-tailwind/react';

// Local component import
import { EicSidebarComponents } from '../Components/EicSidebarComponents';

export const EicEditArticle = () => {
  const { intArticleId } = useParams();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [articleData, setArticleData] = useState({
    strTitle: '',
    strCategory: '',
    strDescription: '',
    strWriter: '',
    strFeedback: '',
    publicationDate: new Date(),
    photos: [],
    strVolume: '',
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
          strFeedback: article.strFeedback,
          publicationDate: new Date(article.publicationDate),
          photos: article.photos.map((photo) => ({ url: photo })),
          strVolume: article.strVolume, // Add strVolume
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

    if (event.key === 'Enter' && name === 'strDescription') {
      event.preventDefault();
      setArticleData((prevArticleData) => ({
        ...prevArticleData,
        [name]: `${value}\n`,
      }));
    } else if (name === 'strFeedback') { // Handle strFeedback separately
      setArticleData((prevArticleData) => ({
        ...prevArticleData,
        strFeedback: value,
      }));
    } else {
      setArticleData((prevArticleData) => ({
        ...prevArticleData,
        [name]: value,
      }));
    }
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

  const handlePhotoUpload = (files) => {
    const updatedPhotosWithData = [];
    const filePromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileReader = new FileReader();

      filePromises.push(
        new Promise((resolve) => {
          fileReader.onload = (event) => {
            const dataUrl = event.target.result;
            const fileType = file.type.startsWith('image') ? 'photo' : 'video';

            updatedPhotosWithData.push({ file, dataUrl, fileType });
            resolve();
          };

          fileReader.readAsDataURL(file);
        })
      );
    }

    Promise.all(filePromises).then(() => {
      setArticleData((prevArticleData) => ({
        ...prevArticleData,
        photos: [...prevArticleData.photos, ...updatedPhotosWithData],
      }));
    });
  };

  const handlePhotoRemove = (index) => {
    setArticleData((prevArticleData) => {
      const updatedPhotos = [...prevArticleData.photos];
      updatedPhotos.splice(index, 1);
      return {
        ...prevArticleData,
        photos: updatedPhotos,
      };
    });
  };


  const removePhoto = (index) => {
    setArticleData((prevArticleData) => {
      const updatedPhotos = [...prevArticleData.photos];
      updatedPhotos.splice(index, 1);
      return {
        ...prevArticleData,
        photos: updatedPhotos,
      };
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
      <EicSidebarComponents />
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

              <TextareaAutosize
                style={{ border: '1px solid #ccc' }}
                aria-label="Title"
                name="strTitle"
                value={articleData.strTitle ? articleData.strTitle.substring(0, 12) : ''}
                onChange={handleInputChange}
                placeholder="Title"
                rowsMin={3}
              />

              <textarea
                style={{ border: '1px solid #ccc' }}
                label="Description"
                name="strDescription"
                value={articleData.strDescription ? articleData.strDescription.substring(0, 12) : ''}
                onChange={handleInputChange}
                placeholder="Description"
              />


              <textarea
                style={{ border: '1px solid #ccc' }}
                label="Writer"
                name="strWriter"
                value={articleData.strWriter ? articleData.strWriter.substring(0, 12) : ''}
                onChange={handleInputChange}
                placeholder="Writer"
              />

              <textarea
                style={{ border: '1px solid #ccc' }}
                label="Feedback"
                name="strFeedback"
                value={articleData.strFeedback ? articleData.strFeedback.substring(0, 12) : ''}
                onChange={handleInputChange}
                placeholder="Feedback"
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
                value={articleData.strCategory} // Update this line
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
                type="text"
                label="Volume"
                name="strVolume"
                value={articleData.strVolume ? articleData.strVolume.substring(0, 12) : ''}
                onChange={handleInputChange}
                placeholder="Volume"
              />
              <InputLabel htmlFor="photos">Photos</InputLabel>
              <input
                type="file"
                id="photos"
                multiple
                onChange={(event) => handlePhotoUpload(event.target.files)}
              />

              <div className="mt-4">
                <Typography variant="h6">Selected Photos:</Typography>
                <div className="flex flex-wrap mt-2">
                  {articleData.photos.map((photo, index) => (
                    <div key={index}>
                      {photo.fileType === 'photo' ? (
                        <img src={photo.dataUrl} alt={`Photo ${index + 1}`} />
                      ) : (
                        <video controls>
                          <source src={photo.dataUrl} type={photo.file.type} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <button onClick={() => handlePhotoRemove(index)}>Remove</button>
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