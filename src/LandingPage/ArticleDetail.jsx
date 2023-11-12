import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { NavigationBar } from "../Components/NavigationBar";
import { Typography } from "@material-tailwind/react";
import { Footer } from "../Components/Footer";

export const ArticleDetail = ({ articles }) => {
    const { articleId } = useParams();
  
    // Debugging: Log articleId and articles data
    console.log('Article ID:', articleId);
    console.log('Articles Data:', articles);
  
    const article = articles.find((article) => article.id === Number(articleId));
  
    if (!article) {
      return <div>Article not found.</div>;
    }
  
    // Render article details here
    return (
      <Fragment>
        <NavigationBar/>
        <div className="px-52 py-24 flex flex-col gap-5">
        <img src={article.imagesrc} alt="Article" className="w-full h-[500px] object-cover" />
        <Typography className="text-green font-bold uppercase">
          {article.category}
        </Typography>
        <Typography variant="h4" color="black">
          {article.title}
        </Typography>
        <Typography>{article.description}</Typography>
        <Typography>Published on: {article.publicationDate}</Typography>
        <Typography className="font-medium text-light-gray">
           Writer: {article.writer}
        </Typography>
        </div>
        <Footer/>
      </Fragment>
    );
  };
  