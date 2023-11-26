import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Sidebar } from '../Components/Sidebar';
import axios from 'axios';

export const AddArticles = () => {
  const [newArticle, setNewArticle] = useState({
    strTitle: '',
    strCategory: '',
    strDescription: '',
    strWriter: '',
    publicationDate: new Date(),
    photos: [],
  });

  const handleAddArticle = () => {
    // Check if required fields are not empty
    if (
      !newArticle.strTitle ||
      !newArticle.strCategory ||
      !newArticle.strDescription ||
      !newArticle.strWriter ||
      !newArticle.publicationDate
    ) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare the article data to be sent to the server
    const articleData = {
      strTitle: newArticle.strTitle,
      strCategory: newArticle.strCategory,
      strDescription: newArticle.strDescription,
      strWriter: newArticle.strWriter,
      publicationDate: newArticle.publicationDate,
      photos: newArticle.photos.map((photo) => photo.file.name), // Extract filenames from the photo objects
    };

    // Send the article data to the server using Axios
    axios
      .post('https://localhost:44392/api/Article/AddArticle', articleData)
      .then((response) => {
        // Handle success
        console.log('Article added:', response.data);
console.log('dasd')
        // Clear the form fields
        setNewArticle({
          strTitle: '',
          strCategory: '',
          strDescription: '',
          strWriter: '',
          publicationDate: new Date(),
          photos: [],
        });
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding article:', error);
      });
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    const uploadedPhotos = Array.from(files);

    const uploadedPhotosWithData = uploadedPhotos.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file), // Generate the preview URL for the photo
    }));

    setNewArticle((prevArticle) => ({
      ...prevArticle,
      photos: prevArticle.photos.concat(uploadedPhotosWithData),
    }));
  };

  const handleRemovePhoto = (index) => {
    setNewArticle((prevArticle) => {
      const updatedPhotos = [...prevArticle.photos];
      updatedPhotos.splice(index, 1);
      return {
        ...prevArticle,
        photos: updatedPhotos,
      };
    });
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="ml-[20rem] p-10">
        <Typography variant="h2">Add Articles</Typography>
        <div className="bg-white border rounded-xl p-10 mt-10 shadow-lg">
          <Typography className="mb-5 text-xl font-semibold ">
            Article Information
          </Typography>

          <form className="flex flex-col gap-5" encType="multipart/form-data">
            <Input
              type="text"
              id="title"
              label="Title"
              value={newArticle.strTitle}
              onChange={(e) => setNewArticle({ ...newArticle, strTitle: e.target.value })}
            />
            <Select
              label="Select Category"
              value={newArticle.strCategory}
              onChange={(value) => setNewArticle({ ...newArticle, strCategory: value })}
            >
              <Option value="News">News</Option>
              <Option value="Feature">Feature</Option>
              <Option value="Opinion">Opinion</Option>
              <Option value="Literary">Literary</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Developmental Communication">
                Developmental Communication
              </Option>
            </Select>

            <Input
              type="text"
              id="description"
              label="Description"
              value={newArticle.strDescription}
              onChange={(e) => setNewArticle({ ...newArticle, strDescription: e.target.value })}
            />

            <Input
              type="text"
              id="writer"
              label="Writer"
              value={newArticle.strWriter}
              onChange={(e) => setNewArticle({ ...newArticle, strWriter: e.target.value })}
            />

            <DatePicker
              label="Publication Date"
              selected={newArticle.publicationDate}
              onChange={(date) => setNewArticle({ ...newArticle, publicationDate: date })}
              dateFormat="MMMM d, yyyy"
              className="w-full px-3 py-2 border rounded"
            />

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

            <Button onClick={handleAddArticle} className="w-fit self-end">
              Add Article
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};