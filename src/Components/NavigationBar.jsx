import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
     <Link to="/News" className="text-green font-medium">News</Link>
      <Link to="/Feature" className="text-green font-medium">Feature</Link>
      <Link to="/Opinion" className="text-green font-medium">Opinion</Link>
      <Link to="/Literary" className="text-green font-medium">Literary</Link>
      <Link to="/Sports" className="text-green font-medium">Sports</Link>
      <Link to="/DevelopmentalCommunication" className="text-green font-medium">Developmental Communication</Link>
    </ul>
  );
 
  return (
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
       
       <div className="flex mx-auto justify-between max-w-[80rem] text-blue-gray-900">
        <Link to="/">
            <img src="/images/nvsulogo.png" alt="nvsu-logo"/>
        </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Link to="/Recruitment" className="hidden lg:block">
            <Button className="border-green border bg-transparent text-green">
            Hiring
            </Button>
           
        </Link>
            <Link to="/Login" className="hidden lg:block">
            <Button className="bg-green">
            Login
            </Button>
           
        </Link>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
    
        <MobileNav open={openNav}>
          {navList}
          <Link to="/Login">
            <Button className="bg-green">
            Login
            </Button>
        </Link>
        <Link to="/Recruitment" className="hidden lg:block">
            <Button className="border-green border bg-transparent text-green">
            Hiring
            </Button>
           
        </Link>
          
        
        </MobileNav>
      </Navbar>
    
  );
}