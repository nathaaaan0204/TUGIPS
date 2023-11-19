import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({
    strName: "",
    strUsername: "",
    strEmail: "",
    strPassword: "",
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

    // Make a POST request to the server endpoint
    axios
      .post("https://localhost:44392/api/Registration/Registration", formData)
      .then((response) => {
        setConfirmationPending(false);
        alert("Registration submitted for admin confirmation");
        // You can redirect the user to a confirmation page or show a confirmation message here
      })
      .catch((error) => {
        setConfirmationPending(false);
        // Handle error, display an error message, or redirect the user to an error page
        console.error("Registration failed:", error);
      });
  };

  return (
    <Fragment>
      <div className="xl:bg-[url('/images/hero-bg.jpg')] h-screen bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center">
        <Card className="rounded w-[500px]">
          <div className="flex flex-col text-center h-screen xl:h-fit justify-center w-full p-6 sm:px-24 lg:p-12 gap-5">
            <div className="w-full flex justify-center">
              <img src="/images/nvsulogo.png" className="w-[200px] h-[50px]" alt="Logo" />
            </div>
            <Typography className="text-2xl font-semibold">Register</Typography>
            <Typography className="">To create an account</Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <Input
                type="text"
                id="strName"
                name="strName"
                label="Name"
                value={formData.strName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                id="strUsername"
                name="strUsername"
                label="Username"
                value={formData.strUsername}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                id="strEmail"
                name="strEmail"
                label="Email"
                value={formData.strEmail}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                id="strPassword"
                name="strPassword"
                label="Password"
                value={formData.strPassword}
                onChange={handleChange}
                required
              />
              <Button type="submit" fullWidth className="bg-green" disabled={confirmationPending}>
                {confirmationPending ? "Registering..." : "Register"}
              </Button>
            </form>
            <Typography className="text-left">
              By clicking the “Register” button, you are creating an account to the Website Name and therefore you agree
              to Company’s
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