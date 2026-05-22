import { useState } from "react";
import { PortfolioCard } from "../componants/card/PortfolioCard";
import { PricingCard } from "../componants/card/PricingCard";
import { Dialog } from "../componants/dialog/Dialog";
import { GithubHeatmap } from "../componants/github-calendar/GithubHeatmap";
import { pricingPlans, protFolioDeatils } from "../storage/data/portfolio-data";
import type { PortfolioType } from "../storage/type/data-type";

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
    <div className="h-full w-full bg-(--background)">
      {/* main content */}
      <div className="flex h-full w-full flex-col items-center justify-start space-y-6 p-5 sm:p-5 md:p-14">
        {/* portfolio section */}

        <div className="flex h-auto w-full flex-col items-center justify-start space-y-5">
          {/* header sectection */}
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-sm font-normal tracking-wide text-(--foreground)">
              Portfolio
            </h1>

            <h1 className="text-4xl leading-7 font-bold tracking-wider text-(--foreground)">
              Latest Project
            </h1>
          </div>
          {/* header sectection end */}

          {/* body sectection */}
          <div className="grid h-auto w-full grid-cols-1 gap-5 p-3 md:grid-cols-2 lg:grid-cols-3">
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

        {/* LIVE METRICS & ACTIVITY */}
        <div className="flex h-auto w-full flex-col items-center justify-start space-y-5 p-3">
          <GithubHeatmap username="tapash22" />
        </div>
        {/* LIVE METRICS & ACTIVITY END*/}

        {/* pricing section */}

        <div className="flex w-full flex-col items-center justify-center space-y-5">
          {/* pricing header */}
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-sm font-normal tracking-wide text-(--foreground)">
              Our Pricing
            </h1>

            <h1 className="text-4xl leading-7 font-bold tracking-wider text-(--foreground)">
              Pricing Table
            </h1>
          </div>
          {/* pricing header end */}

          {/* pricing body */}

          <div className="flex w-full flex-col items-center justify-center gap-2 p-0 sm:gap-3 md:flex-row md:gap-8 md:p-5">
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

        <div className="space-y-4">
          <div className="my-2 h-72 w-full overflow-hidden">
            <a href={item?.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item?.image?.[0] || "/fallback.jpg"}
                className="h-full w-full rounded-md object-cover"
              />
            </a>
          </div>

          <p className="text-lg leading-7 text-white/80">{item?.description}</p>

          <div className="flex h-auto w-full items-center justify-center px-0 py-3 sm:px-0 md:px-10">
            <div className="grid h-auto w-full grid-cols-1 gap-2 space-y-5 rounded-lg bg-(--sidebar)/10 p-4 ring-2 ring-(--border) sm:grid-cols-1 sm:space-y-5 md:grid-cols-3 md:items-center md:justify-center md:space-y-0 md:rounded-full">
              <p className="flex w-full flex-col items-center justify-center text-lg font-medium tracking-wide text-(--foreground)">
                <span className="text-lg font-bold tracking-wider">
                  Product Type
                </span>
                <span className="text-lg font-medium tracking-wider">
                  Fintech Website
                </span>
              </p>
              <p className="flex w-full flex-col items-center justify-center border-t border-b border-(--border) text-lg font-semibold tracking-wide text-(--foreground) md:border-t-0 md:border-r-2 md:border-b-0 md:border-l-2">
                <span className="text-lg font-medium tracking-wider">
                  Product Price
                </span>
                <span className="text-lg font-bold tracking-wider">$ 50</span>
              </p>
              <div className="flex justify-center">
                <button className="rounded-lg px-10 py-2 text-sm font-normal tracking-wide text-(--muted) ring-2 ring-(--border)">
                  Contact Me
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2">
            <img
              src={item?.image?.[1] || "/fallback.jpg"}
              className="h-52 w-full rounded-md object-cover"
            />
            <img
              src={item?.image?.[2] || "/fallback.jpg"}
              className="h-52 w-full rounded-md object-cover"
            />
          </div>

          <p className="text-justify text-lg leading-7 text-white/80">
            {item?.brief}
          </p>
        </div>

        {/* Dialog Portfolio Body end */}
      </Dialog>

      {/* portfolio dialog view end*/}
    </div>
  );
}
