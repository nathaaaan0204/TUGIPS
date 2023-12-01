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


const App = () => {
  // Define your user data or fetch it from an API
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin' },
    { id: 2, name: 'User 2', email: 'user2@example.com', role: 'Staff' },
    // Add more user data
  ]);

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
      <Route path="/ViewUsers" element={<ViewUsers />} />
      <Route path="/AddUsers" element={<AddUsers />} />
      <Route path="/EditUser/:intRegistrationId" element={<EditUser/>} />
      <Route path="/ViewArticles" element={<ViewArticles />} />
      <Route path="/AddArticles" element={<AddArticles />} />
      <Route path="/EditArticle/:intArticleId" element={<EditArticle/>} />


    </Routes>
  </Fragment>
  );
};

export default App;