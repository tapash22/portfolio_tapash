import { useState } from "react";
import { blogs } from "../storage/data/blog-data";
import type { BlogType } from "../storage/type/data-type";
import BlogCard from "../componants/card/BlogCard";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Dialog } from "../componants/dialog/Dialog";

export function Blog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState<BlogType | null>(null);

  //show selected blog into dialog with details
  const handleOpenDialog = (item: BlogType) => {
    setSelected(item);
    setOpenDialog(true);
  };

  //close details dialog
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="w-full h-screen flex items-center relative overflow-hidden bg-(--background)">
      {/* main content */}
      <div className="p-16 flex flex-col justify-center items-center w-full h-full space-y-5 ">
        {/* header sectection */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
            From my Blog
          </h1>

          <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
            Latest News
          </h1>
        </div>
        {/* header sectection end */}

        {/* body sectection */}
        <div className="w-full h-auto px-10 py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                item={blog}
                onClick={() => handleOpenDialog(blog)}
              />
            );
          })}
        </div>
        {/* body sectection end */}
      </div>
      {/* main content end*/}

      {/* dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{selected?.title}</h2>
          <button onClick={closeDialog} className="cursor-pointer">
            <IoCloseCircleOutline size={30} className="text-white" />
          </button>
        </div>
        {/* Header end*/}

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          <div className="w-full h-72 overflow-hidden my-2">
            <img
              src={selected?.cover}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <p className="text-white/80 text-lg leading-7">
            {selected?.description}
          </p>
          <div className="w-full h-auto px-10 py-3 flex justify-center items-center">
            <div className="w-full h-auto p-4 ring-1 ring-(--border) flex justify-center items-center rounded-full bg-(--sidebar)">
              <p className="text-lg font-medium tracking-wide text-(--foreground) w-full text-justify">
                {selected?.content}
              </p>
            </div>
          </div>

          <p className="text-white/80 text-lg leading-7 text-justify">
            {selected?.content}
          </p>
        </div>
        {/* Body end*/}
      </Dialog>
      {/* dialog end*/}
    </div>
  );
}
