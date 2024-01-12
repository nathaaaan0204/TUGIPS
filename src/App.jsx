  import { Fragment, useState } from "react";
  import { HomePage } from "./LandingPage/HomePage";
  import { Route, Routes } from "react-router-dom";
  import { News } from "./LandingPage/News";
  import { Literary } from "./LandingPage/Literary";
  import { Sports } from "./LandingPage/Sports";
  import { DevelopmentalCommunication } from "./LandingPage/DevelopmentalCommunication";
  import { Feature } from "./LandingPage/Feature";
  import { Opinion } from "./LandingPage/Opinion";
  import { ArticleDetail } from "./LandingPage/ArticleDetail";
  import { articlesData } from "./Utils/Data";
  import { Login } from "./AdminPanel/Login";
  import { Dashboard } from "./AdminPanel/Dashboard";
  import { ViewUsers } from "./AdminPanel/ViewUsers";
  import { AddUsers } from "./AdminPanel/AddUsers";
  import { EditUser } from "./AdminPanel/EditUser";
  import { ViewArticles } from "./AdminPanel/ViewArticles";
  import { AddArticles } from "./AdminPanel/AddArticles";
  import { EditArticle } from "./AdminPanel/EditArticle";
  import { Register } from "./AdminPanel/Register";
  import { NewsStaffDashboard } from "./StaffPanel/NewsStaffDashboard";
  import { DevelopmentsStaffDashboard } from "./StaffPanel/DevelopmentsStaffDashboard";
  import { FeaturesStaffDashboard } from "./StaffPanel/FeaturesStaffDashboard";
  import { LiteraryStaffDashboard } from "./StaffPanel/LiteraryStaffDashboard";
  import { OpinionsStaffDashboard } from "./StaffPanel/OpinionsStaffDashboard";
  import { SportsStaffDashboard } from "./StaffPanel/SportsStaffDashboard";
  import { StudentDashboard } from "./StaffPanel/StudentDashboard";
  
  import { NewsStaffViewArticles } from "./StaffPanel/NewsStaffViewArticles";
  import { OpinionsStaffViewArticles } from "./StaffPanel/OpinionsStaffViewArticles";
  import { LiteraryStaffViewArticles } from "./StaffPanel/LiteraryStaffViewArticles";
  import { SportsStaffViewArticles } from "./StaffPanel/SportsStaffViewArticles";
  import { DevelopmentsStaffViewArticles } from "./StaffPanel/DevelopmentsStaffViewArticles";
  import { FeaturesStaffViewArticles } from "./StaffPanel/FeaturesStaffViewArticles";
  import { StudentViewArticles } from "./StaffPanel/StudentViewArticles";
  import { EicDashboard } from "./EICPANEL/EicDashboard";
  import { EicViewArticle } from "./EICPANEL/EicViewArticle";
  import { EicEditArticle } from "./EICPANEL/EicEditArticle";
  import { NewsStaffAddArticles } from "./StaffPanel/NewsStaffAddArticles";
  import { OpinionsStaffAddArticles } from "./StaffPanel/OpinionsStaffAddArticles";
  import { FeaturesStaffAddArticles } from "./StaffPanel/FeaturesStaffAddArticles";
  import { LiteraryStaffAddArticles } from "./StaffPanel/LiteraryStaffAddArticles";
  import { SportsStaffAddArticles } from "./StaffPanel/SportsStaffAddArticles";
  import { DevelopmentsStaffAddArticles } from "./StaffPanel/DevelopmentsStaffAddArticles";
  import { StudentAddArticles } from "./StaffPanel/StudentAddArticles";
  import { RecruitmentPage } from "./LandingPage/RecruitmentPage";
  import { NewsStaffEditArticles } from "./StaffPanel/NewsStaffEditArticles";
  import { FeaturesStaffEditArticles } from "./StaffPanel/FeaturesStaffEditArticles";
  import { OpinionsStaffEditArticles } from "./StaffPanel/OpinionsStaffEditArticles";
  import { SportsStaffEditArticles } from "./StaffPanel/SportsStaffEditArticles";
  import { LiteraryStaffEditArticles } from "./StaffPanel/LiteraryStaffEditArticles";
  import { DevelopmentsStaffEditArticles } from "./StaffPanel/DevelopmentsStaffEditArticles";
  
  

  const App = () => {

    return (
      <Fragment>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/News" element={<News />} />
        <Route path="/Feature" element={<Feature />} />
        <Route path="/Opinion" element={<Opinion />} />
        <Route path="/Literary" element={<Literary />} />
        <Route path="/Sports" element={<Sports />} />
        <Route path="/DevelopmentalCommunication" element={<DevelopmentalCommunication />} />
        
        {/* Define the route for article details */}
        <Route path="/article/:intArticleId" element={<ArticleDetail articles={articlesData} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/NewsStaffDashboard" element={<NewsStaffDashboard />} />
        <Route path="/FeaturesStaffDashboard" element={<FeaturesStaffDashboard />} />
        <Route path="/OpinionsStaffDashboard" element={<OpinionsStaffDashboard />} />
        <Route path="/LiteraryStaffDashboard" element={<LiteraryStaffDashboard />} />
        <Route path="/SportsStaffDashboard" element={<SportsStaffDashboard />} />
        <Route path="/DevelopmentsStaffDashboard" element={<DevelopmentsStaffDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/ViewUsers" element={<ViewUsers />} />
        <Route path="/AddUsers" element={<AddUsers />} />
        <Route path="/EditUser/:intRegistrationId" element={<EditUser/>} />
        <Route path="/ViewArticles" element={<ViewArticles />} />
        <Route path="/AddArticles" element={<AddArticles />} />
        <Route path="/EditArticle/:intArticleId" element={<EditArticle/>} />
        <Route path="/NewsStaffViewArticles" element={<NewsStaffViewArticles/>} />
        <Route path="/OpinionsStaffViewArticles" element={<OpinionsStaffViewArticles/>} />
        <Route path="/FeaturesStaffViewArticles" element={<FeaturesStaffViewArticles/>} />
        <Route path="/DevelopmentsStaffViewArticles" element={<DevelopmentsStaffViewArticles/>} />
        <Route path="/LiteraryStaffViewArticles" element={<LiteraryStaffViewArticles/>} />
        <Route path="/SportsStaffViewArticles" element={<SportsStaffViewArticles/>} />
        <Route path="/StudentViewArticles" element={<StudentViewArticles/>} />
        <Route path="/NewsStaffEditArticles/:intArticleId" element={<NewsStaffEditArticles/>} />
        <Route path="/OpinionsStaffEditArticles/:intArticleId" element={<OpinionsStaffEditArticles/>} />
        <Route path="/SportsStaffEditArticles/:intArticleId" element={<SportsStaffEditArticles/>} />
        <Route path="/FeaturesStaffEditArticles/:intArticleId" element={<FeaturesStaffEditArticles/>} />
        <Route path="/DevelopmentsStaffEditArticles/:intArticleId" element={<DevelopmentsStaffEditArticles/>} />
        <Route path="/LiteraryStaffEditArticles/:intArticleId" element={<LiteraryStaffEditArticles/>} />
        <Route path="/EicDashboard" element={<EicDashboard />} />
        <Route path="/EicViewArticle" element={<EicViewArticle/>} />
        <Route path="/EicEditArticle/:intArticleId" element={<EicEditArticle/>} />
        <Route path="/NewsStaffAddArticles" element={<NewsStaffAddArticles/>} />
        <Route path="/OpinionsStaffAddArticles" element={<OpinionsStaffAddArticles/>} />
        <Route path="/FeaturesStaffAddArticles" element={<FeaturesStaffAddArticles/>} />
        <Route path="/LiteraryStaffAddArticles" element={<LiteraryStaffAddArticles/>} />
        <Route path="/SportsStaffAddArticles" element={<SportsStaffAddArticles/>} />
        <Route path="/DevelopmentsStaffAddArticles" element={<DevelopmentsStaffAddArticles/>} />
        <Route path="/StudentAddArticles" element={<StudentAddArticles/>} />
        <Route path="/Recruitment" element={<RecruitmentPage />} />
        


      </Routes>
    </Fragment>
    );
  };

  export default App;