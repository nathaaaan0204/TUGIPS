import React, { Fragment } from 'react'
import { Sidebar } from '../Components/Sidebar'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <Fragment>
        <Sidebar/>
        <div className="ml-[20rem] p-10 flex flex-col gap-10">
          <Typography className="text-4xl text-green font-semibold">Welcome to the TUGIPS Dashboard</Typography>
          <img 
          src="https://img.freepik.com/free-photo/person-writing-office_53876-94944.jpg?w=1380&t=st=1699779375~exp=1699779975~hmac=0eeca260a819faaab1afcba99ddb4e98e07111810ceaad54d212847c07751aaa"
          className='w-full h-[400px] object-cover rounded-xl'
          />

          <div className='flex items-center justify-center gap-5'>
           <Link to="/ViewArticles"> <div className='bg-light-green-200 hover:bg-green hover:text-white flex gap-5 py-6 px-16 text-2xl items-center rounded-xl'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
</svg>

View Articles            </div>
            </Link>
            <Link to="/AddArticles"> <div className='bg-light-green-200 hover:bg-green hover:text-white flex gap-5 py-6 px-16 text-2xl items-center rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
</svg>

Add Articles
            </div>
            </Link>
            <Link to="/ViewUsers"> <div className='bg-light-green-200 hover:bg-green hover:text-white flex gap-5 py-6 px-16 text-2xl items-center rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
View Users
            </div>
            </Link>
            <Link to="/AddArticles"> <div className='bg-light-green-200 hover:bg-green hover:text-white flex gap-5 py-6 px-16 text-2xl items-center rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
Add Articles
            </div>
            </Link>
            
          </div>
        </div>
    </Fragment>
  )
}
