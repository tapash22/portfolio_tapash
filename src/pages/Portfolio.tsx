import { protFolioDeatils } from "../storage/data/portfolio-data";
import { PortfolioCard } from "../componants/card/PortfolioCard";
import { Dialog } from "../componants/dialog/Dialog";
import { IoCloseCircleOutline } from "react-icons/io5";
import service2 from "../assets/images/services/service2.jpg";
import service3 from "../assets/images/services/service3.jpg";
import type { ServiceType } from "../storage/type/data-type";
import { useState } from "react";

export default function Projects() {
  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<ServiceType | null>(null);

  //this handle selected data and also open dialog
  const handleClick = (value: ServiceType) => {
    setOpenDialog(true);
    setItem(value);
  };

  // this are handle close dialog
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="w-full h-screen relative flex items-center overflow-hidden bg-(--background)">
      {/* main content */}
      <div className="p-16 flex flex-col justify-center items-center w-full h-full space-y-5 overflow-y-auto scrollbar-thin">
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

        {/* pricing header */}

        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
            Our Pricing
          </h1>

          <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
            Pricing Table
          </h1>
        </div>
        {/* pricing header end */}

        {/* pricing body */}
        <div className="w-full h-auto px-10 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"></div>

        {/* pricing body end */}

        {/* body sectection end */}
      </div>
      {/* main content end*/}

      {/* dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{item?.title}</h2>
          <button onClick={closeDialog} className="cursor-pointer">
            <IoCloseCircleOutline size={30} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          <div className="w-full h-72 overflow-hidden my-2">
            <img
              src={item?.image}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <p className="text-white/80 text-lg leading-7">{item?.description}</p>
          <div className="w-full h-auto px-10 py-3 flex justify-center items-center">
            <div className="w-full h-auto p-4 ring-1 ring-(--border) grid grid-cols-3 gap-2 justify-center items-center rounded-full bg-(--sidebar)">
              <p className="text-lg font-medium tracking-wide text-(--foreground) flex flex-col justify-center items-center w-full">
                <span className="font-bold">Product Type</span>
                <span className="font-bold">Fintech Website</span>
              </p>
              <p className="text-lg font-semibold tracking-wide text-(--foreground) flex flex-col justify-center items-center w-full border-l  border-r border-(--border)">
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

          <div className="grid grid-cols-2 gap-3">
            <img
              src={service2}
              className="w-full h-52 object-cover rounded-md"
            />
            <img
              src={service3}
              className="w-full h-52 object-cover rounded-md"
            />
          </div>

          <p className="text-white/80 text-lg leading-7 text-justify">
            {item?.brief}
          </p>
        </div>
      </Dialog>
      {/* dialog end*/}
    </div>
  );
}
