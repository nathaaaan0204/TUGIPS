// Home.js
import React, { Fragment } from 'react';
import { NavigationBar } from '../Components/NavigationBar';
import { HeroSection } from './HeroSection';
import { RecentArticles } from './RecentArticles';
import { Footer } from '../Components/Footer';
import { RecruitmentBanner } from './RecruitmentBanner';
const recentArticles = [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' },
    { id: 3, title: 'Article 3' },
  ];
export const HomePage = () => {
   
  return (
   <Fragment>
        <NavigationBar/>
        <HeroSection/>
        <RecentArticles articles={recentArticles} />
        <RecruitmentBanner/>
        <Footer/>
   </Fragment>
     
   
  );
};

