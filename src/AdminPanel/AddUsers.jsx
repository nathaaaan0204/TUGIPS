import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { SidebarComponent } from '../Components/SidebarComponent';

export const AddUsers = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    strName: '',
    strEmail: '',
    strUsername: '',
    strPassword: '',
    strRole: '', // Default role
  });

  const handleAddUser = async () => {
    if (!newUser.strName || !newUser.strEmail || !newUser.strUsername || !newUser.strPassword || !newUser.strRole) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('https://localhost:44392/api/Registration/Registration', newUser);
      console.log(response.data); // Log the response data if needed

      // Clear the form fields
      setNewUser({
        strName: '',
        strEmail: '',
        strUsername: '',
        strPassword: '',
        strRole: '',
      });

      // Call the onAddUser callback if needed
      // onAddUser(response.data); // Pass the newly created user data to the parent component
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the HTTP request
    }
  };

  return (
    <Fragment>
      <SidebarComponent />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col">
        <Typography variant="h2">Add Users</Typography>
        <div className="bg-white border rounded-xl p-10 mt-10 shadow-lg">
          <Typography className="mb-5 text-xl font-semibold ">User Information</Typography>

          <form className="flex flex-col gap-5">
            <Input
              type="text"
              id="name"
              label="Name"
              value={newUser.strName}
              onChange={(e) => setNewUser({ ...newUser, strName: e.target.value })}
            />
            <Input
              type="text"
              id="username"
              label="Username"
              value={newUser.strUsername}
              onChange={(e) => setNewUser({ ...newUser, strUsername: e.target.value })}
            />

            <Input
              type="email"
              id="email"
              label="Email"
              value={newUser.strEmail}
              onChange={(e) => setNewUser({ ...newUser, strEmail: e.target.value })}
            />

            <Input
              type="password"
              id="password"
              label="Password"
              value={newUser.strPassword}
              onChange={(e) => setNewUser({ ...newUser, strPassword: e.target.value })}
            />

            <Select
              label="Role"
              value={newUser.strRole}
              onChange={(value) => setNewUser({ ...newUser, strRole: value })}
            >
              <Option value="News Staff">News Staff</Option>
              <Option value="Opinions Staff">Opinions Staff</Option>
              <Option value="Literary Staff">Literary Staff</Option>
              <Option value="Features Staff">Features Staff</Option>
              <Option value="Sports Staff">Sports Staff</Option>
              <Option value="Development Staff">Development Staff</Option>
              <Option value="Student">Student</Option>
              <Option value="EIC">EIC</Option>
              <Option value="Admin">Admin</Option>
            </Select>
            <Button onClick={handleAddUser} className="bg-green sm:w-[200px] w-full self-end">
              Add User
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};