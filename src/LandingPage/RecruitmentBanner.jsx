import { Button } from "@material-tailwind/react";
import React from "react";

export const RecruitmentBanner = () => {
  return (
    <div className="flex items-center justify-center py-20 lg:px-8 px-4 bg-green">
      <div className="max-w-[80rem] flex flex-col items-center gap-5 text-center text-white">
        <h2 className="text-4xl font-bold">Join Our Team: Explore Exciting Opportunities with Us!</h2>
        <p>
          Are you ready to take the next step in your career journey? [Your
          Company Name] is on the lookout for passionate individuals to join our
          dynamic team! We're not just offering jobs; we're offering
          opportunities to grow, innovate, and thrive.
        </p>
        <Button className="bg-white text-green w-[200px]">
              Apply now
              </Button>
      </div>
    </div>
  );
};
