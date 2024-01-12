import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { OpinionsStaffSidebarComponents } from '../Components/OpinionsStaffSidebarComponents';

export const OpinionsStaffAddArticles = () => {
  const [newArticle, setNewArticle] = useState({
    strTitle: '',
    strCategory: '',
    strDescription: '',
    strWriter: '',
    strVolume: '',
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
      !newArticle.strVolume ||
      !newArticle.publicationDate
    ) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare the article data to be sent to the server
    const formData = new FormData();
    formData.append('strTitle', newArticle.strTitle);
    formData.append('strCategory', newArticle.strCategory);
    formData.append('strDescription', newArticle.strDescription);
    formData.append('strWriter', newArticle.strWriter);
    formData.append('strVolume', newArticle.strVolume);
    formData.append('publicationDate', newArticle.publicationDate);
    newArticle.photos.forEach((photo) => {
      formData.append('photos', photo.file);

    });



    axios
      .post('https://localhost:44392/api/Article/AddArticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle success
        console.log('Article added:', response.data);
        // Clear the form fields
        setNewArticle({
          strTitle: '',
          strCategory: '',
          strDescription: '',
          strWriter: '',
          strVolume: '',
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

    const uploadedPhotosWithData = uploadedPhotos.map((file) => {
      const fileType = file.type.split('/')[0]; // Get the file type (e.g., image, video)
      const preview = URL.createObjectURL(file); // Generate the preview URL for the file

      return {
        file: file,
        preview: preview,
        type: fileType,
      };
    });

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
      <OpinionsStaffSidebarComponents />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col">
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
              <Option value="Feature"></Option>
              <Option value="Opinion">Opinion</Option>
            
            </Select>

            <textarea
              id="description"
              placeholder="Description"
              value={newArticle.strDescription}
              onChange={(e) => setNewArticle({ ...newArticle, strDescription: e.target.value })}
              style={{ lineHeight: '2', resize: 'vertical', border: '1px solid #ccc' }}
            />

            <Input
              type="text"
              id="volume"
              label="Volume"
              value={newArticle.strVolume}
              onChange={(e) => setNewArticle({ ...newArticle, strVolume: e.target.value })}
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
              dateFormat="MMMM d, yyyy : h:mm a"
              showTimeSelect
              timeFormat="h:mm aa"
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
                    {photo.type === 'image' ? (
                      <img
                        src={photo.preview}
                        alt={`Photo ${index + 1}`}
                        className="w-100 h-100 object-cover rounded mr-2 mb-2"
                      />
                    ) : (
                      <video
                        src={photo.preview}
                        alt={`Video ${index + 1}`}
                        className="w-100 h-100 object-cover rounded mr-2 mb-2"
                        controls
                      />
                    )}
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

            <Button onClick={handleAddArticle} className="bg-green sm:w-[200px] w-full self-end">
              Add Article
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};