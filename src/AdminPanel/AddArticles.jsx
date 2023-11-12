import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import { Sidebar } from '../Components/Sidebar';

export const AddArticles = () => {
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    description: '',
    writer: '',
    publicationDate: '', 
  });

  const handleAddArticle = () => {
    // Perform user creation logic here
    // Add validation as needed
// Check if required fields are not empty
if (!newArticle.title || !newArticle.category || !newArticle.description || !newArticle.writer || !newArticle.publicationDate) {
  alert('Please fill in all required fields');
  return;
}
    // Clear the form fields
    setNewArticle({
    title: '',
    category: '',
    description: '',
    writer: '',
    publicationDate: '', 
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

          <form className="flex flex-col gap-5">
          <Input
              type="text"
              id="title"
              label="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
            <Select
              label="Select Category"
              value={newArticle.category}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
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
              id="description"
              label="Description"
              value={newArticle.description}
              onChange={(e) =>
                setNewArticle({ ...newArticle, description: e.target.value })
              }
            />
            <Input
              type="text"
              id="writer"
              label="Writer"
              value={newArticle.writer}
              onChange={(e) =>
                setNewArticle({ ...newArticle, writer: e.target.value })
              }
            />
            <Input
              type="text"
              id="date"
              label="Publication Date"
              value={newArticle.publicationDate}
              onChange={(e) =>
                setNewArticle({ ...newArticle, publicationDate: e.target.value })
              }
            />

            
            <Button onClick={handleAddArticle} className="w-fit self-end">Add User</Button>

            </form>
          </div>
        </div>
      </Fragment>
    
      
  );
};
