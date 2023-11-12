import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { dummyUsers } from "../Utils/Data";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const simulateLogin = (email, password) => {
    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    return user || null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = simulateLogin(email, password);
    setTimeout(() => {
      setLoading(false);
  
    if (user) {
      // Authentication successful, redirect to the homepage or dashboard
      // Use React Router's history.push('/') to redirect
      // Replace '/homepage' with the actual URL where you want to redirect
      navigate("/Dashboard");
      alert(`Login successful as ${credentials.role}`); 
    } else {
      // Authentication failed, show an error message to the user
      setError("Invalid email or password. Please try again.");
    }
  }, 2000);
  };

  return (
    <Fragment>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <BeatLoader color="#0e4c00" loading={loading} />
        </div>
      ) : (
        <div className="xl:bg-[url('/images/hero-bg.jpg')] h-screen bg-no-repeat bg-cover bg-center min-h-screen flex items-center justify-center">
          <Card className="rounded shadow-md h-screen xl:h-fit xl:w-[1000px] lg:flex lg:flex-row xl:divide-x-2">
            <div className="flex flex-col text-center h-screen xl:h-fit justify-center w-full p-6 sm:px-24 lg:p-12 gap-5">
              <div className="w-full flex justify-center">
                <img src="/images/nvsulogo.png" className="w-[200px] h-[50px]" />
              </div>
              <Typography className="text-2xl font-semibold">
                Sign in
              </Typography>
              <Typography className="">To access Website Name</Typography>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <Input
  type="email"
  id="email"
  label="Email"
  aria-label="Email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setError("");
  }}
  required
/>
<Input
  type="password"
  id="password"
  label="Password"
  aria-label="Password"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setError("");
  }}
  required
/>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                
                  <Button type="submit" fullWidth className="bg-green">
                    Sign In
                  </Button>
                
              </form>
              <Typography className="text-left">
                By clicking the “Sign in” button, you are entering the Website Name
                 and therefore you agree to Company’s
                <strong className="ml-1">Terms of service</strong> and
                <strong className="ml-1">Privacy Policy.</strong>
              </Typography>
              <Typography>
                Don't have an account? 
                <Link to="/Register" className="text-green font-medium ml-1">
                  Sign Up
                </Link>
              </Typography>
              <Typography>
                Go to 
                <Link to="/" className=" font-medium ml-1">
                home page
                </Link>
              </Typography>
            </div>
            <div className="w-full p-12 hidden lg:flex flex-col gap-5 h-screen xl:h-fit justify-center">
              <Typography variant="h1" className="text-center">
                Lead Generation Made Easy
              </Typography>

              <Typography>
                Experience the future of lead generation with our cutting-edge
                platform. Sign in to access a wealth of high-quality leads, all
                at your fingertips. Our user-friendly tools and powerful
                algorithms ensure that you'll never miss a valuable lead again.
                Join us today and elevate your lead generation game to new
                heights.
              </Typography>
              <img src="/images/hero-bg.jpg" className="rounded-xl" />
            </div>
          </Card>
        </div>
      )}
    </Fragment>
  );
};