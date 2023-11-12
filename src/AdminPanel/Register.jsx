import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const Register = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [confirmationPending, setConfirmationPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submitting data to the server for admin confirmation
    setConfirmationPending(true);

    // In a real-world scenario, you would send this data to a server endpoint for further processing
    // For now, let's simulate a delay to mimic the server confirmation process
    setTimeout(() => {
      setConfirmationPending(false);
      alert("Registration submitted for admin confirmation");
      // You can redirect the user to a confirmation page or show a confirmation message here
    }, 2000);
  };

  return (
    <Fragment>
      
        <div className="xl:bg-[url('/images/hero-bg.jpg')] h-screen bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center">
          <Card className="rounded w-[500px]">
            <div className="flex flex-col text-center h-screen xl:h-fit justify-center w-full p-6 sm:px-24 lg:p-12 gap-5">
              <div className="w-full flex justify-center">
                <img src="/images/nvsulogo.png" className="w-[200px] h-[50px]" />
              </div>
              <Typography className="text-2xl font-semibold">
                Register
              </Typography>
              <Typography className="">To create an account</Typography>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          id="username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" fullWidth className="bg-green" disabled={confirmationPending}>
          {confirmationPending ? "Registering..." : "Register"}
        </Button>
      </form>
              <Typography className="text-left">
                By clicking the “Register” button, you are creating an account to the Website Name
                 and therefore you agree to Company’s
                <strong className="ml-1">Terms of service</strong> and
                <strong className="ml-1">Privacy Policy.</strong>
              </Typography>
              <Typography>
                Already have an account? 
                <Link to="/Login" className="text-green font-medium ml-1">
                  Sign in
                </Link>
              </Typography>
            </div>
      
          </Card>
        </div>
    
    </Fragment>
  );
};