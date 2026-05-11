import { PiDesktop } from "react-icons/pi";
import { Timeline } from "../componants/time-line/Timeline";
import image from "/images/about.png";

export default function About() {
  // const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    console.log("click");
  };
  return (
    <div className="w-full h-full bg-(--background)">
      <div className="p-5 sm:p-5 md:p-10 flex flex-col sm:flex-col md:flex-row justify-center items-center w-full h-full space-y-8 sm:space-y-8  md:space-y-0">
        {/* left sectection */}
        <div
          className="w-full sm:w-full md:w-1/4 h-full 
                  flex justify-start md:justify-center
                  items-start md:items-center p-2
        "
        >
          <img
            src={image}
            className="object-cover rounded-xl shadow-(--shadow-footer) scale-100 max-w-auto max-h-auto ring-1 ring-(--border) p-1"
          />
        </div>
        {/* left sectection end */}

        {/* middle timeline section */}
        <div
          className="
                  w-full sm:w-full md:w-1/4 h-full sm:h-full md:h-full p-3 sm:p-3 md:p-10
                  flex justify-center items-start  "
        >
          <Timeline />
        </div>
        {/* middle timeline section end*/}

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
              className="w-fit text-sm md:text-lg font-semibold tracking-wider text-(--foreground) text-center sm:text-center md:text-start whitespace-nowrap
             border-b-2 border-t-2 md:border-t-0 border-(--border) p-3 "
            >
              Frontend Developer at Anwar Technology
            </p>

            <button
              onClick={openDialog}
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
    </div>
  );
}
