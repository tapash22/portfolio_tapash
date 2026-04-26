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

        <div className="flex flex-row justify-start items-center space-x-3">
          <div className="w-8 h-8 rounded-full ring-2 ring-(--border) p-1 bg-(--sidebar) flex justify-center items-center">
            <FaRegUser size={20} className="text-(--muted)" />
          </div>

          <p className="flex items-center text-sm text-(--foreground)/70">
            By {blog.author}
            <span className="mx-2 h-4 border-l border-(--foreground)" />
            {blog.date}
          </p>
        </div>
      </div>
    </div>
  );
}
