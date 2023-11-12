import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
 
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12">
      <Link to="/News" className="text-green font-medium">News</Link>
      <Link to="/Feature" className="text-green font-medium">Feature</Link>
      <Link to="/Opinion" className="text-green font-medium">Opinion</Link>
      <Link to="/Literary" className="text-green font-medium">Literary</Link>
      <Link to="/Sports" className="text-green font-medium">Sports</Link>
      <Link to="/DevelopmentalCommunication" className="text-green font-medium">Developmental Communication</Link>
    </ul>
  );
}
 
export const NavigationBar = () =>{
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="fixed z-50 h-20 backdrop-saturate-0 backdrop-blur-none bg-opacity-100 mx-auto border-none rounded-none max-w-full py-2 px-4 lg:px-8 lg:py-4 xl:py-2">
      <div className="flex items-center h-full justify-between text-blue-gray-900">
        <Link to="/">
            <img src="/images/nvsulogo.png" alt="nvsu-logo"/>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <Link to="/Login">
            Login
        </Link>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}