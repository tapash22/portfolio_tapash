import { protFolioDeatils } from "../storage/data/portfolio-data";
import { PortfolioCard } from "../componants/card/PortfolioCard";

export default function Projects() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <div className="w-full h-screen flex items-center relative overflow-hidden bg-(--background)">
      <div className="p-16 flex flex-col justify-center items-center w-full h-full space-y-5 overflow-y-auto scrollbar-thin">
        {/* header sectection */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-sm font-normal text-(--foreground) tracking-wide">
            Portfolio
          </h1>

          <h1 className="text-4xl font-bold tracking-wider leading-7 text-(--foreground)">
            Latest Project
          </h1>
        </div>
        {/* header sectection end */}

        {/* body sectection */}
        <div className="w-full h-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {protFolioDeatils.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onClick={handleClick}
            />
          ))}
        </div>
        {/* body sectection end */}
      </div>
    </div>
  );
}
