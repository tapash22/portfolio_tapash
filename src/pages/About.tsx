import { useState } from "react";
import { PiDesktop } from "react-icons/pi";
import { Dialog } from "../componants/dialog/Dialog";
import { ResponsiveTimeline } from "../componants/time-line/ResponsiveTimeline";
import { TimeLineSIdeBarWithDot } from "../componants/time-line/TimeLineSIdeBarWithDot";
import { blueprintData } from "../storage/data/blueprient-data";

export default function About() {
  // const [showDialog, setShowDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    console.log("click");
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="w-full h-full relative bg-(--background)">
      <div className="p-5 sm:p-5 md:p-10 flex flex-col sm:flex-col md:flex-row justify-center items-center w-full h-full space-y-8 sm:space-y-8  md:space-y-0">
        {/* left sectection */}
        <ResponsiveTimeline />

        {/* right sectection */}
        <div
          className="
                  w-full sm:w-full md:w-2/4 h-full sm:h-full md:h-full p-2
                  flex flex-col justify-center items-center sm:items-center 
                  md:items-start sm:justify-center md:justify-center space-y-5 "
        >
          <div
            className="w-14 h-14 rounded-xl md:rounded-lg  p-2 
                        flex justify-center items-center bg-transparent shadow-(--shadow) ring-2 ring-(--border) opacity-80 "
          >
            <PiDesktop
              size={40}
              className="text-(--foreground) md:text-(--muted)"
            />
          </div>

          <div className="flex flex-col space-y-3 items-center md:items-start">
            <h1
              className="text-xl sm:text-xl md:text-2xl md:whitespace-nowrap
                       font-medium sm:font-medium md:font-bold tracking-wide 
                       text-(--foreground) text-wrap w-full sm:w-full md:w-2/3 
                       text-center sm:text-center md:text-start leading-7 md:leading-10
                      border-b-2 border-t-2 md:border-b-0 md:border-t-0 border-(--border) py-3 md:py-0 "
            >
              Professional Frontend Developer & Creative UI Engineer
            </h1>
            <p
              className="text-sm md:text-lg font-light text-(--foreground) tracking-wider text-wrap 
                      text-justify sm:text-center md:text-start leading-6 md:leading-9 "
            >
              Discover top web design and development companies tailored to your
              business needs. Our carefully curated directory features highly
              reviewed firms specializing in modern, scalable, and user-focused
              solutions. From enterprise-level design to startup-friendly
              services, we connect you with experts in custom web solutions,
              eCommerce platforms, and mobile app development. Whether you need
              a stunning landing page or a full-scale application, these firms
              deliver high-quality results with a focus on performance,
              security, and user experience. Services include web design,
              landing page creation, mobile website design, and app development,
              all supported by secure systems and reliable customer support.
            </p>

            <p
              className="w-full md:w-fit text-sm md:text-lg font-semibold tracking-wider text-(--foreground) text-center sm:text-center md:text-start whitespace-nowrap
             border-b-2 border-t-2 md:border-t-0 border-(--border) p-3 "
            >
              Frontend Developer at Anwar Technology
            </p>

            <button
              onClick={handleClick}
              className="bg-(--button-color) text-sm text-(--foreground) 
                    font-normal tracking-wider uppercase ring-1 ring-(--border) 
                    w-1/2 sm:w-1/2 md:w-1/4 p-2 my-2 rounded-full "
            >
              More About
            </button>
          </div>
        </div>

        {/* right sectection end */}
      </div>

      {/* dialog */}
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        title={blueprintData?.title}
        showFooter={true}
        mdWidthClass="md"
        footerContent={() => (
          <>
            <a
              href="/cv/tapash-paul-cv.pdf"
              download
              className="
              p-3
          md:px-10 md:py-3 rounded-lg
          border border-(--border)
          bg-(--baackground) text-(--muted) text-sm font-medium

          hover:invert transition-all
          hover:text-(--foreground)
          tracking-wider
          whitespace-nowrap
        "
            >
              Get CV
            </a>

            <button
              onClick={() => {
                window.open("https://github.com/your-profile", "_blank");
              }}
              className="
          p-3
          md:px-10 md:py-3  rounded-lg
          border-2 border-(--border)
          bg-transparent
          shadow-(--shadow-footer)
          backdrop-blur-lg
          text-(--foreground) text-sm font-medium
          hover:bg-(--sidebar)/40 transition-all
          tracking-wider
          whitespace-nowrap
        "
            >
              View Github
            </button>
          </>
        )}
      >
        <div className=" py-3 md:py-0">
          <h2 className="text-lg md:text-2xl font-bold text-(--foreground) tracking-wider uppercase text-center md:text-start">
            {blueprintData.profile.role}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2 ">
            {/* Tech Capabilities */}
            <div className="space-y-2">
              <h3 className="text-sm font-normal text-(--muted) uppercase tracking-wider text-center md:text-start ">
                Technical Core
              </h3>
              {blueprintData.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="group relative p-2 md:p-2 rounded-xl border-2 border-(--border) bg-(--background)/50 hover:bg-(--background)/10 transition-all"
                >
                  <div className="flex justify-start items-center gap-2 ">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <h4 className="text-(--foreground) font-semibold text-sm tracking-wide">
                        {tech.name}
                      </h4>
                      <p className="text-(--muted) text-xs font-light leading-normal tracking-wide">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Career Timeline / Workflow */}
            <div className="space-y-2 flex flex-col justify-center items-center  md:items-end ">
              <h3 className="text-sm font-normal text-start text-(--muted) uppercase tracking-wider ">
                Engineering Workflow
              </h3>
              <div className="relative flex justify-center items-center h-full">
                {/* ANIMATED TIMELINE DOTS */}
                <TimeLineSIdeBarWithDot
                  cardCount={blueprintData.workflow.length}
                  height={240}
                  animateTrigger={true}
                />

                {/* CONTENT */}
                <div className=" flex flex-col gap-4">
                  {blueprintData.workflow.map((step) => (
                    <div
                      key={step.id}
                      className="
                        py-3 px-5
                        ring-2 ring-(--neon)
                        rounded-lg
                        shadow-(--shadow)
                        bg-(--background)/50
                        z-10
                      "
                    >
                      <h4 className="text-(--foreground) font-medium text-sm uppercase tracking-wider text-center">
                        {step.title}
                      </h4>

                      <p className="text-(--muted) text-xs tracking-wider font-light text-center">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
        </div>
      </Dialog>
      {/* dialog end */}
    </div>
  );
}
