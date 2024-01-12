import React, { Fragment } from "react";
import { NavigationBar } from "../Components/NavigationBar";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { Footer } from "../Components/Footer";

export const RecruitmentPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <Fragment>
      <NavigationBar />
      <div className="bg-green text-white pt-40 pb-20 px-4 lg:px-8 text-center">
        <h1 className="text-4xl font-bold">Join Our Team</h1>
        <p className="mt-4">Explore Exciting Opportunities with Us!</p>
      </div>
      <div className="flex flex-col gap-10 items-center justify-center py-20 lg:px-8 px-4">
        <div className="max-w-[80rem] ">
          <div className="flex gap-10 items-center">
            <div className="">
              <Typography className="text-green font-bold uppercase text-4xl">
                Writer
              </Typography>
              <h2 className="font-bold text-xl mb-2">Job Description</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                assumenda consequatur aperiam quia necessitatibus esse deleniti
                natus pariatur illo laborum.
              </p>
              <h2 className="font-bold text-xl mb-2">Job Requirements</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                assumenda consequatur aperiam quia necessitatibus esse deleniti
                natus pariatur illo laborum.
              </p>
            </div>
            
            <Button className="w-[150px] h-[50px] bg-green" onClick={handleOpen}>Apply Now</Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Application Process</DialogHeader>
              <DialogBody className="h-[42rem] overflow-scroll">
                <div className="flex flex-col gap-2">
                  <h1 className="text-black font-bold text-xl">Applying in Office:</h1>
                  <ol className="flex flex-col gap-2">
                    <li>
                      <strong className="text-black font-semibold">Visit the Company's Office:</strong> <br></br>
                      Go to the physical location of the company during the
                      specified application hours.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Request Application Form:</strong> <br></br>
                      Ask the receptionist or designated personnel for a
                      physical job application form.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Complete Application Form:</strong> <br></br>
                      Fill out the application form with your personal details,
                      educational background, and work experience.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Prepare Resume and Cover Letter:</strong>{" "}
                      <br></br>
                      Bring printed copies of your resume and cover letter to
                      submit along with the application form.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Submit Documents:</strong> <br></br>
                      Hand in the completed application form, resume, and cover
                      letter to the designated person or department.
                    </li>
                  </ol>
                  <h1 className="text-black font-bold">Applying via Email:</h1>
                  <ol className="flex flex-col gap-2">
                    <li>
                      <strong className="text-black font-bold">Explore Job Openings:</strong> <br></br>
                      Navigate to the "Hiring" section to find the available
                      positions.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Select Position:</strong> <br></br>
                      Click on the job title to view the detailed job
                      description and application instructions.
                    </li>
                    <li>
                      <strong>
                        Click the link below to send your resume to email:
                      </strong>{" "}
                      <br></br>
                      <a href="mailto:info@nvsu.edu.ph" className="underline text-green font-semibold">Send email</a>
                    </li>
                   
                  </ol>
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button className="font-bold text-white bg-green" onClick={handleOpen}>
                  Close
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        <div className="max-w-[80rem] ">
          <div className="flex gap-10 items-center">
            <div className="">
              <Typography className="text-green font-bold uppercase text-4xl">
                Driver
              </Typography>
              <h2 className="font-bold text-xl mb-2">Job Description</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                assumenda consequatur aperiam quia necessitatibus esse deleniti
                natus pariatur illo laborum.
              </p>
              <h2 className="font-bold text-xl mb-2">Job Requirements</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                assumenda consequatur aperiam quia necessitatibus esse deleniti
                natus pariatur illo laborum.
              </p>
            </div>
            
            <Button className="w-[150px] h-[50px] bg-green" onClick={handleOpen}>Apply Now</Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Application Process</DialogHeader>
              <DialogBody className="h-[42rem] overflow-scroll">
                <div className="flex flex-col gap-2">
                  <h1 className="text-black font-bold text-xl">Applying in Office:</h1>
                  <ol className="flex flex-col gap-2">
                    <li>
                      <strong className="text-black font-semibold">Visit the Company's Office:</strong> <br></br>
                      Go to the physical location of the company during the
                      specified application hours.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Request Application Form:</strong> <br></br>
                      Ask the receptionist or designated personnel for a
                      physical job application form.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Complete Application Form:</strong> <br></br>
                      Fill out the application form with your personal details,
                      educational background, and work experience.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Prepare Resume and Cover Letter:</strong>{" "}
                      <br></br>
                      Bring printed copies of your resume and cover letter to
                      submit along with the application form.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Submit Documents:</strong> <br></br>
                      Hand in the completed application form, resume, and cover
                      letter to the designated person or department.
                    </li>
                  </ol>
                  <h1 className="text-black font-bold">Applying via Email:</h1>
                  <ol className="flex flex-col gap-2">
                    <li>
                      <strong className="text-black font-bold">Explore Job Openings:</strong> <br></br>
                      Navigate to the "Hiring" section to find the available
                      positions.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Select Position:</strong> <br></br>
                      Click on the job title to view the detailed job
                      description and application instructions.
                    </li>
                    <li>
                      <strong>
                        Click the link below to send your resume to email:
                      </strong>{" "}
                      <br></br>
                      <a href="mailto:info@nvsu.edu.ph" className="underline text-green font-semibold">Send email</a>
                    </li>
                   
                  </ol>
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button className="font-bold text-white bg-green" onClick={handleOpen}>
                  Close
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
        <div className="max-w-[80rem] ">
          <div className="flex gap-10 items-center">
            <div className="">
              <Typography className="text-green font-bold uppercase text-4xl">
                Teacher
              </Typography>
              <h2 className="font-bold text-xl mb-2">Job Description</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                assumenda consequatur aperiam quia necessitatibus esse deleniti
                natus pariatur illo laborum.
              </p>
              <h2 className="font-bold text-xl mb-2">Job Requirements</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                assumenda consequatur aperiam quia necessitatibus esse deleniti
                natus pariatur illo laborum.
              </p>
            </div>
            
            <Button className="w-[150px] h-[50px] bg-green" onClick={handleOpen}>Apply Now</Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Application Process</DialogHeader>
              <DialogBody className="h-[42rem] overflow-scroll">
                <div className="flex flex-col gap-2">
                  <h1 className="text-black font-bold text-xl">Applying in Office:</h1>
                  <ol className="flex flex-col gap-2">
                    <li>
                      <strong className="text-black font-semibold">Visit the Company's Office:</strong> <br></br>
                      Go to the physical location of the company during the
                      specified application hours.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Request Application Form:</strong> <br></br>
                      Ask the receptionist or designated personnel for a
                      physical job application form.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Complete Application Form:</strong> <br></br>
                      Fill out the application form with your personal details,
                      educational background, and work experience.
                    </li>
                    <li>
                      <strong className="text-black font-semibold">Prepare Resume and Cover Letter:</strong>{" "}
                      <br></br>
                      Bring printed copies of your resume and cover letter to
                      submit along with the application form.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Submit Documents:</strong> <br></br>
                      Hand in the completed application form, resume, and cover
                      letter to the designated person or department.
                    </li>
                  </ol>
                  <h1 className="text-black font-bold">Applying via Email:</h1>
                  <ol className="flex flex-col gap-2">
                    <li>
                      <strong className="text-black font-bold">Explore Job Openings:</strong> <br></br>
                      Navigate to the "Hiring" section to find the available
                      positions.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Select Position:</strong> <br></br>
                      Click on the job title to view the detailed job
                      description and application instructions.
                    </li>
                    <li>
                      <strong>
                        Click the link below to send your resume to email:
                      </strong>{" "}
                      <br></br>
                      <a href="mailto:info@nvsu.edu.ph" className="underline text-green font-semibold">Send email</a>
                    </li>
                   
                  </ol>
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button className="font-bold text-white bg-green" onClick={handleOpen}>
                  Close
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
