import { FaRegUser } from "react-icons/fa";
import type { BlogType } from "../../storage/type/data-type";

interface BlogCardProps {
  blog: BlogType;
  onClick: () => void;
}

export function BlogCard({ blog, onClick }: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl overflow-hidden ring-1 ring-(--border) group shadow-lg"
    >
      <div className="w-full h-44 overflow-hidden">
        <img
          src={blog.cover}
          className="w-full h-full object-fit group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-3 space-y-2 bg-(--background) ">
        <h2 className="text-lg font-normal text-(--foreground) tracking-wider whitespace-nowrap">
          {blog.title}
        </h2>
        {/* bottom section */}
        <div className="flex flex-row justify-start items-center space-x-3 space-y-1 ">
          <div className="w-8 h-8 rounded-full ring-2 ring-(--border) p-1 bg-(--sidebar) flex justify-center items-center">
            <FaRegUser size={20} className="text-(--muted)" />
          </div>

          {/* info details */}
          <div className="flex flex-row items-center space-x-3">
            <span className="text-sm text-(--muted) tracking-wider font-light">
              By {blog.author}
            </span>
            {/* <span className="w-px self-stretch bg-(--border)" /> */}
            <span className="self-stretch border-l-2 border-(--border)" />

            <span className="text-sm text-(--muted) tracking-wider font-light">
              {blog.date}
            </span>
          </div>

          {/* info details end*/}
        </div>
        {/* bottom section end*/}
      </div>
    </div>
  );
}
