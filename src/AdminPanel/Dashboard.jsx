import React, { Fragment } from "react";
import { Sidebar } from "../Components/Sidebar";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { SidebarComponent } from "../Components/SidebarComponent";
import { ArticleIcon, UsersIcon } from "../Components/CustomSvgIcons";

export const Dashboard = () => {
  return (
    <Fragment>
      <SidebarComponent />
      <div className="lg:ml-[20rem] h-screen py-16 px-8 flex flex-col gap-10">
        <Typography className="text-4xl text-green text-center lg:text-left font-semibold">
          Welcome to the TUGIPS Dashboard
        </Typography>
        <img
          src="https://img.freepik.com/free-photo/person-writing-office_53876-94944.jpg?w=1380&t=st=1699779375~exp=1699779975~hmac=0eeca260a819faaab1afcba99ddb4e98e07111810ceaad54d212847c07751aaa"
          className="w-full h-[400px] object-cover rounded-xl"
        />

        <div className="flex items-center flex-wrap justify-center gap-5">
         
          <Link to="/ViewArticles">
              <Button className="flex items-center gap-5 text-black hover:text-white hover:bg-green bg-light-green-300 w-[200px]">
                <UsersIcon />
              View Articles
              </Button>
            </Link>
            <Link to="/AddArticles">
              <Button className="flex items-center gap-5 text-black hover:text-white hover:bg-green bg-light-green-300 w-[200px]">
                <UsersIcon />
                Add Articles
              </Button>
            </Link>
           
            <Link to="/ViewUsers">
              <Button className="flex items-center gap-5 text-black hover:text-white hover:bg-green bg-light-green-300 w-[200px]">
                <UsersIcon />
                View Users
              </Button>
            </Link>
           
            <Link to="/AddUsers">
              <Button className="flex items-center gap-5 text-black hover:text-white hover:bg-green bg-light-green-300 w-[200px]">
                <UsersIcon />
                Add Users
              </Button>
            </Link>
           
           
        
        </div>
      </div>
    </Fragment>
  );
};
