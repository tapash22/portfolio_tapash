import type { BlogType } from "../../storage/type/data-type";

interface BlogCardProps {
  item: BlogType;
  onClick: () => void;
}

export default function BlogCard({ item, onClick }: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl overflow-hidden group shadow-lg"
    >
      <div className="w-full h-52 overflow-hidden">
        <img
          src={item.cover}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-4 space-y-2 bg-(--background)">
        <h2 className="text-lg font-semibold text-(--foreground)">
          {item.subtitle}
        </h2>

        <p className="text-sm text-(--foreground)/70">
          By {item.author} {item.date}
        </p>
      </div>
    </div>
  );
}
