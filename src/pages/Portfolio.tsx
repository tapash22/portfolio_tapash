import { protFolioDeatils, pricingPlans } from "../storage/data/portfolio-data";
import { PortfolioCard } from "../componants/card/PortfolioCard";
import { Dialog } from "../componants/dialog/Dialog";
import type { PortfolioType } from "../storage/type/data-type";
import { useState } from "react";
import { PricingCard } from "../componants/card/PricingCard";
// import { useOutletContext } from "react-router-dom";

export default function Projects() {
  // handle scroll reset on dialog open and close
  // const { lockScroll, unlockScroll } = useOutletContext<LayoutContextType>();

  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<PortfolioType | null>(null);

  //this handle selected data and also open dialog
  const handleClick = (value: PortfolioType) => {
    setOpenDialog(true);
    setItem(value);
    // lockScroll();
  };

  // this are handle close dialog
  const closeDialog = () => {
    setOpenDialog(false);
    // unlockScroll();
  };

  return (
    <div className="w-full h-full flex items-start bg-(--background)">
      {/* main content */}
      <div className="p-5 sm:p-5 md:p-14 flex flex-col justify-start items-center w-full h-full space-y-6">
        {/* portfolio section */}

        <div className="flex flex-col justify-start items-center w-full h-auto space-y-5">
          {/* header sectection */}
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
              Portfolio
            </h1>

            <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
              Latest Project
            </h1>
          </div>
          {/* header sectection end */}

          {/* body sectection */}
          <div className="w-full h-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {protFolioDeatils.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                onClick={() => handleClick(portfolio)}
              />
            ))}
          </div>
        </div>

        {/* portfolio section end*/}

        {/* pricing section */}

        <div className="flex flex-col justify-center items-center w-full space-y-5">
          {/* pricing header */}
          <div className="w-full flex flex-col justify-center items-center ">
            <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
              Our Pricing
            </h1>

            <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
              Pricing Table
            </h1>
          </div>
          {/* pricing header end */}

          {/* pricing body */}

          <div
            className="w-full p-0 md:p-5 flex flex-col md:flex-row 
            justify-center items-center 
            gap-2 sm:gap-3 md:gap-8"
          >
            {pricingPlans.map((pricingPlan) => {
              return (
                <PricingCard key={pricingPlan.id} pricingPlan={pricingPlan} />
              );
            })}
          </div>

          {/* pricing body end */}
        </div>

        {/* pricing section end*/}
      </div>

      {/* main content end*/}

      {/* portfolio dialog view */}

      <Dialog open={openDialog} onClose={closeDialog} title={item?.title}>
        {/* Dialog Portfolio Body */}

        <div className="space-y-4 ">
          <div className="w-full h-72 overflow-hidden my-2">
            <a href={item?.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item?.image || "/fallback.jpg"}
                className="w-full h-full object-cover rounded-md"
              />
            </a>
          </div>

          <p className="text-white/80 text-lg leading-7">{item?.description}</p>

          <div className="w-full h-auto px-0 sm:px-0 md:px-10 py-3 flex justify-center items-center">
            <div className="w-full h-auto p-4 ring-1 ring-(--border) grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-2 md:justify-center md:items-center rounded-lg md:rounded-full bg-(--sidebar) space-y-5 sm:space-y-5 md:space-y-0">
              <p className="text-lg font-medium tracking-wide text-(--foreground) flex flex-col justify-center items-center w-full">
                <span className="font-bold">Product Type</span>
                <span className="font-bold">Fintech Website</span>
              </p>
              <p className="text-lg font-semibold tracking-wide text-(--foreground) flex flex-col justify-center items-center w-full border-t border-b md:border-b-0 md:border-t-0 md:border-l  md:border-r border-(--border)">
                <span className="font-bold">Product Price</span>
                <span className="font-bold">$ 50</span>
              </p>
              <div className="flex justify-center">
                <button className="px-10 py-2 text-sm font-normal tracking-wide text-(--muted) ring-1 ring-(--border) rounded-xl">
                  Contact Me
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
            <img
              src={item?.image || "/fallback.jpg"}
              className="w-full h-52 object-cover rounded-md"
            />
            <img
              src={item?.image || "/fallback.jpg"}
              className="w-full h-52 object-cover rounded-md"
            />
          </div>

          <p className="text-white/80 text-lg leading-7 text-justify">
            {item?.brief}
          </p>
        </div>

        {/* Dialog Portfolio Body end */}
      </Dialog>

      {/* portfolio dialog view end*/}
    </div>
  );
}
