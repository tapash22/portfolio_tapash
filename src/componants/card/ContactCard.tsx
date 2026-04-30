import type { IconType } from "react-icons";
import type { ContactType } from "../../storage/type/data-type";

interface ContactCardProps {
  contact: ContactType;
}
export function ContactCard({ contact }: ContactCardProps) {
  const Icon: IconType = contact.icon;

  return (
    <div
      className="w-full flex flex-col justify-center items-center 
                bg-(--sidebar) rounded-lg sm:rounded-lg md:rounded-lg
                ring-1 ring-(--border) 
                shadow-(--shadow-footer) py-4 space-y-2"
    >
      <div
        className="w-16 h-16 rounded-full flex justify-center items-center 
                      ring-2 ring-(--border) shadow-(--shadow) opacity-80"
      >
        <Icon size={30} className="text-(--foreground)" />
      </div>
      <h3
        className="text-lg sm:text-lg md:text-xl font-medium tracking-wider
                    text-(--foreground) border-b-2 w-full text-center 
                    border-(--border) leading-8 md:leading-10"
      >
        {contact.label}
      </h3>
      <ul className="list-none flex justify-center items-center">
        {contact.values.map((value, index) => (
          <li
            key={index}
            className="text-sm sm:text-sm md:text-lg font-medium 
                     text-(--foreground) flex justify-center text-center tracking-wider 
                     p-1 md:p-2 text-wrap whitespace-nowrap"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
