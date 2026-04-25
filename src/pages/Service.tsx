import { useState } from "react";
import { ServiceCard } from "../componants/card/ServiceCard";
import { services } from "../storage/data/services";
import { IoCloseCircleOutline } from "react-icons/io5";
import service1 from "../assets/images/services/service1.jpg";
import service2 from "../assets/images/services/service2.jpg";
import service3 from "../assets/images/services/service3.jpg";
import type { ServiceType } from "../storage/type/data-type";
import { Dialog } from "../componants/dialog/Dialog";

export default function Experience() {
  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<ServiceType | null>(null);

  const handleDialog = (value: ServiceType) => {
    setOpenDialog(true);
    setItem(value);
    console.log(value);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="w-full h-screen flex items-center relative overflow-hidden bg-(--background)">
      <div className="p-16 flex flex-col justify-center items-center w-full h-full space-y-5 ">
        {/* header sectection */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
            What I am Expert In
          </h1>
          <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
            My Service
          </h1>
        </div>
        {/* header sectection end */}

        {/* body sectection */}
        <div className="w-full h-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {services.map((info) => (
            <ServiceCard
              key={info.id}
              item={info}
              onClick={() => handleDialog(info)}
            />
          ))}
        </div>
        {/* body sectection end */}
      </div>

      {/* dialog view */}
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
          <div className="w-full h-72 overflow-hidden">
            <img
              src={service1}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <p className="text-white/80 text-lg leading-7">{item?.description}</p>

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
      {/* dialog view end*/}
    </div>
  );
}
