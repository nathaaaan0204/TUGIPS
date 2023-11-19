import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import axios from "axios"; // Import axios library


export const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const [strUsername, setUsername] = useState("");
  const [strPassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      strUsername: strUsername,
      strPassword: strPassword
    };
    const url = "https://localhost:44392/api/Registration/Login";
  
    axios.post(url, data)
    .then((result) => {
      const dt = result.data;
      if (dt && dt.registration && dt.registration.strRole) {
        const role = dt.registration.strRole.trim(); // Remove leading/trailing whitespace
          if (role === "Admin") {
            alert("Admin login successful");
            navigate("/Dashboard");
            console.log("Admin logged in:", dt);
          } else if (role === "Staff") {
            alert("Staff login successful");
            navigate("/Dashboard");
            console.log("Staff logged in:", dt);
          } else {
            alert("Invalid role");
            console.log("Invalid role:", dt);
          }
        } else {
          alert("Login failed");
          console.log("Login failed:", dt);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password. Please try again.");
      });
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
                  type="username"
                  id="strUsername"
                  label="username"
                  value={strUsername}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <Input
                  type="password"
                  id="strPassword"
                  label="Password"
                  value={strPassword}
                  onChange={(e) => setPassword(e.target.value)}
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