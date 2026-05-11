import { useState } from "react";
import { BlogCard } from "../componants/card/BlogCard";
import { Dialog } from "../componants/dialog/Dialog";
import { blogs } from "../storage/data/blog-data";
import type { BlogType } from "../storage/type/data-type";

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
    <div className="w-full h-full relative bg-(--background) ">
      {/* main content */}
      <div className="p-5 sm:p-5 md:p-14 flex flex-col justify-start items-start w-full h-full space-y-6">
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
        <div className="w-full h-auto p-3 py-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {blogs.map((blog: BlogType) => {
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

        <div className="space-y-3 ">
          <article className="w-full space-y-3 ">
            {/* --- Header Section --- */}
            <div className="space-y-3 py-3 sm:py-3 md:py-0">
              <p className="text-lg text-(--foreground) italic">
                {selectedBlog?.subtitle}
              </p>

              <div className="flex items-center text-sm text-(--foreground) pb-3">
                <span className="font-medium">By {selectedBlog?.author}</span>

                <span className="mx-2 h-4 border-l border-(--foreground)" />

                <span>{selectedBlog?.date}</span>
              </div>
            </div>

            {/* --- Cover Image --- */}
            <div className="w-full h-auto rounded-lg md:rounded-2xl overflow-hidden bg-(--background)">
              <img
                src={selectedBlog?.cover}
                alt={selectedBlog?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* --- Blog Description --- */}
            <div className="p-2">
              <p className="text-base md:text-lg leading-6 text-(--foreground)">
                {selectedBlog?.description}
              </p>
            </div>

            {/* --- Dynamic Blog Sections --- */}
            <div className="w-full">
              <article
                className="
                          prose prose-invert
                          prose-headings:text-white
                          prose-p:text-(--foreground)
                          prose-strong:text-white
                          prose-li:text-(--foreground)
                          prose-code:text-cyan-400
                          prose-pre:bg-black/40
                          w-full
                          space-y-5
                        "
              >
                <div className="space-y-5 border-t-2 border-b-2 border-(--border) py-5">
                  {selectedBlog?.sections?.map((section, index) => (
                    <section key={index} className="space-y-3">
                      {/* --- Section Heading --- */}
                      <div
                        className={`
                                    border-l-4 border-(--muted)
                                    rounded-r-lg
                                    bg-(--background)/50
                                    w-auto
                                    p-2
                                    shadow-(--shadow) 
                                  `}
                      >
                        <h2 className="text-lg md:text-xl font-bold tracking-wider  text-(--foreground)">
                          {section.title}
                        </h2>
                      </div>

                      {/* --- Section Body --- */}
                      <div
                        className="
                                border border-(--border)
                                rounded-2xl
                                bg-(--background)/40
                                backdrop-blur-md
                                p-4
                                shadow-(--shadow-footer)
                              "
                      >
                        {/* LIST */}
                        {section.type === "list" && (
                          <ul className="space-y-1">
                            {Array.isArray(section.content) &&
                              section.content.map((item: string, i: number) => (
                                <li
                                  key={i}
                                  className="leading-6 text-(--muted) tracking-wide"
                                >
                                  - {item}
                                </li>
                              ))}
                          </ul>
                        )}

                        {/* CODE */}
                        {section.type === "code" && (
                          <div
                            className="
                                  bg-(--background)/50
                                  rounded-xl
                                  overflow-hidden
                                  border border-(--border)
                                "
                          >
                            <div
                              className="
                                      bg-(--background)/40
                                      p-2
                                      text-sm tracking-wider
                                      border-b border-(--border) text-(--muted)
                                    "
                            >
                              example.tsx
                            </div>

                            <pre className="p-5 overflow-x-auto">
                              <code className="font-mono text-sm leading-6 text-(--foreground) ">
                                {section.content}
                              </code>
                            </pre>
                          </div>
                        )}

                        {/* PARAGRAPH */}
                        {section.type === "paragraph" && (
                          <div
                            className="
                                      whitespace-pre-line
                                      leading-7
                                      text-base md:text-lg text-(--muted)
                                    "
                          >
                            {section.content}
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            </div>
          </article>
        </div>

        {/* Dialog Blog Body end*/}
      </Dialog>

      {/* Blog Dialog view end*/}
    </div>
  );
}
