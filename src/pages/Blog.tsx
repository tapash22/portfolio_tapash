import { useState } from "react";
import { blogs } from "../storage/data/blog-data";
import type { BlogType } from "../storage/type/data-type";
import { BlogCard } from "../componants/card/BlogCard";
import { Dialog } from "../componants/dialog/Dialog";

export default function Blog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  //show selectedBlog blog into dialog with details
  const handleOpenDialog = (blog: BlogType) => {
    setSelectedBlog(blog);
    setOpenDialog(true);
  };

  //close details dialog
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="w-full h-screen flex flex-col relative bg-(--background)">
      {/* main content */}
      <div className="flex-1 space-y-10 p-16 overflow-y-auto scrollbar-thin">
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
                blog={blog}
                onClick={() => handleOpenDialog(blog)}
              />
            );
          })}
        </div>
        {/* body sectection end */}
      </div>
      {/* main content end*/}

      {/* Blog Dialog view */}
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        title={selectedBlog?.title}
      >
        {/* Dialog Blog Body */}

        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2  scrollbar-thin">
          <article className="w-full p-3 ">
            {/* --- Header Section --- */}
            <div className="space-y-3">
              <h1 className="text-2xl tracking-wide font-bold text-(--foreground) ">
                {selectedBlog?.title}
              </h1>
              <p className="text-xl text-(--foreground) italic ">
                {selectedBlog?.subtitle}
              </p>

              <div className="flex items-center text-sm text-(--foreground) pb-3">
                <span className="font-medium text-(--foreground)">
                  By {selectedBlog?.author}
                </span>
                <span className="mx-2 h-4 border-l border-(--border)" />
                <span>{selectedBlog?.date}</span>
              </div>
            </div>

            {/* --- Cover Image --- */}
            <div className="w-full h-auto rounded-2xl overflow-hidden bg-(--background)">
              <img
                src={selectedBlog?.cover}
                alt={selectedBlog?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* --- Content Body --- */}
            <div className="prose prose-invert p-3 ">
              <hr className="border-(--border) " />
              <p className="whitespace-pre-line leading-relaxed text-lg text-(--foreground) ">
                {selectedBlog?.content}
              </p>
              <hr className="border-(--border) my-5" />
            </div>

            {/* --- Beginner's Guide Section --- */}
            <section className="bg-muted/30 rounded-3xl p-8 border border-(--border) space-y-5">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-(--foreground)">
                Beginner's Guide
              </h2>

              {/* Prerequisites */}
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-(--foreground) mb-3">
                  Prerequisites
                </h3>
                <ul className="flex flex-col flex-wrap gap-2">
                  {selectedBlog?.prerequisites.map((pkg, index) => (
                    <li
                      key={index}
                      className="px-3 space-x-1  text-(--foreground) rounded-full text-sm"
                    >
                      <span className="font-bold text-sm">{index + 1}.</span>{" "}
                      <span>{pkg}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-(--foreground) ">
                  Installation
                </h3>
                <div className="bg-black p-4 rounded-xl flex justify-between items-center group">
                  <code className="text-green-400 font-mono text-sm">
                    $ {selectedBlog?.installation}
                  </code>
                  <button className="text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 px-2 py-1 rounded">
                    Copy
                  </button>
                </div>
              </div>

              {/* Usage Example */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-widest font-semibold text-(--foreground)">
                  Quick Start (Usage)
                </h3>
                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-(--border)">
                  <div className="bg-white/5 px-4 py-2 text-xs border-b border-(--border) text-(--foreground)">
                    example-usage.js
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-(--muted) font-mono text-sm leading-6">
                      {selectedBlog?.usage}
                    </code>
                  </pre>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* Dialog Blog Body end*/}
      </Dialog>

      {/* Blog Dialog view end*/}
    </div>
  );
}
