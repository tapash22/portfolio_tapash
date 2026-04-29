import type { BlogType } from "../../storage/type/data-type";
import { FaRegUser } from "react-icons/fa";

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
      <div className="w-full h-52 overflow-hidden">
        <img
          src={blog.cover}
          className="w-full h-full object-fit group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5 space-y-3 bg-(--background)">
        <h2 className="text-lg font-medium text-(--foreground) tracking-wide">
          {blog.subtitle}
        </h2>
        <div className="flex flex-col sm:flex-col md:flex-row justify-start items-start md:items-center space-x-0 md:space-x-3  space-y-2 md:space-y-0 w-full">
          <div className="flex flex-row justify-start items-center space-x-2  md:border-r border-(--foreground)">
            <div className="w-8 h-8 rounded-full ring-2 ring-(--border) p-1 bg-(--sidebar) flex justify-center items-center">
              <FaRegUser size={20} className="text-(--muted)" />
            </div>

            <p className="flex items-center text-sm text-(--foreground)/70 whitespace-nowrap">
              By {blog.author}
              <span className="mx-2 h-4 " />
            </p>
          </div>
          <p className="text-sm font-light text-(--foreground) tracking-wider">
            {blog.date}
          </p>
        </div>
      </div>
    </div>
  );
}
