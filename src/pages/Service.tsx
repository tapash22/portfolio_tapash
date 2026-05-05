import { useState } from "react";
import { ServiceCard } from "../componants/card/ServiceCard";
import { services } from "../storage/data/services";
import type { ServiceType } from "../storage/type/data-type";
import { Dialog } from "../componants/dialog/Dialog";
import { useOutletContext } from "react-router-dom";

type LayoutContextType = {
  setLockScroll: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Service() {
  // handle scroll reset on dialog open and close
  const { setLockScroll } = useOutletContext<LayoutContextType>();

  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<ServiceType | null>(null);

  const handleDialog = (value: ServiceType) => {
    setOpenDialog(true);
    setItem(value);
    setLockScroll(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setLockScroll(false);
  };

  return (
    <div className="w-full h-full flex items-start bg-(--background)">
      <div className="p-5 sm:p-5 md:p-14 flex flex-col justify-center items-center w-full h-full space-y-6">
        {/* header sectection */}
        <div className="w-full flex flex-col justify-start items-center space-y-2">
          <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
            What I am Expert In
          </h1>
          <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
            My Service
          </h1>
        </div>
        {/* header sectection end */}

        {/* body sectection */}
        <div className="w-full p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

      {/* service dialog view */}
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        title={item?.title || "Service Details"}
      >
        {/*Dialog service Body */}
        <div className="space-y-4 ">
          <div className="w-full h-48 md:h-96 overflow-hidden rounded-lg shadow-md bg-black/10 flex items-center justify-center">
            <img
              src={item?.image?.[0] || "/fallback.jpg"}
              className="w-full h-full  transform-gpu transition-transform duration-500 ease-out hover:scale-125"
            />
          </div>

          <p className="text-white/80 text-lg leading-7">{item?.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
            <div className="h-96 bg-black/10 rounded-md flex items-center justify-center">
              <img
                src={item?.image?.[1] || "/fallback.jpg"}
                className="max-w-full max-h-full object-contain rounded-md"
              />
            </div>

            <div className="h-96 bg-black/10 rounded-md flex items-center justify-center">
              <img
                src={item?.image?.[2] || "/fallback.jpg"}
                className="max-w-full max-h-full object-contain rounded-md"
              />
            </div>
          </div>

          <p className="text-white/80 text-lg leading-7 text-justify">
            {item?.brief}
          </p>
        </div>
        {/* Dialog service Body end */}
      </Dialog>
      {/* service dialog view end*/}
    </div>
  );
}
