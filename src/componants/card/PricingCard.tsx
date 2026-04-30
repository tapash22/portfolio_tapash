import type { PricingPlan } from "../../storage/type/data-type";

interface PricingCardProps {
  pricingPlan: PricingPlan;
}
export function PricingCard({ pricingPlan }: PricingCardProps) {
  return (
    <div
      key={pricingPlan.id}
      className={`relative w-full md:max-w-92
  pt-8 sm:pt-10 md:pt-16 pb-3 sm:pb-4 md:pb-5
  transition-transform duration-500 group
  ${
    pricingPlan.highlight ? "scale-100 md:scale-105" : "scale-100 md:scale-100"
  }`}
    >
      {/* Top Floating Icon Circle */}
      <div
        className={`absolute  left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center shadow-xl ring-1 z-20
    ${
      pricingPlan.highlight
        ? "bg-(--neon-color) w-16 h-16 sm:w-16 sm:h-16 md:w-28 md:h-28 ring-(--foreground) -top-1 sm:top-2 md:top-0"
        : "bg-(--sidebar) w-12 h-12 sm:w-12 sm:h-12 md:w-24 md:h-24 ring-(--border) top-0 sm:top-2 md:top-0"
    }`}
      >
        <span
          className={`text-xl sm:text-2xl md:text-3xl font-bold italic ${
            pricingPlan.highlight ? "text-(--foreground)" : "text-(--muted)"
          }`}
        >
          {pricingPlan.title[0]}
        </span>
      </div>

      {/* Wrapper */}
      <div className="relative p-0.5 rounded-[40px] md:rounded-[55px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2">
        {/* Beam */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute top-1/2 left-1/2 w-[150%] h-[150%]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, transparent 280deg, var(--box-shadow) 360deg)`,
            }}
          />
        </div>

        {/* Card */}
        <div
          className={`relative z-10 bg-(--background)
      rounded-[38px] md:rounded-[54px]
      overflow-hidden flex flex-col items-center
      pb-4 sm:pb-6 md:pb-8
      space-y-2 sm:space-y-3 md:space-y-5
      shadow-xl
      border cursor-pointer transition-all duration-500
      ${pricingPlan.highlight ? "border-(--neon-color)" : "border-(--border)"}
      group-hover:border-transparent group-hover:shadow-(--box-shadow)
      `}
        >
          {/* Header */}
          <div
            className={`w-full p-5 sm:p-6 md:p-12 flex justify-center ${
              pricingPlan.highlight ? "bg-(--neon-color)" : "bg-(--sidebar)"
            }`}
          >
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-center">
              {pricingPlan.title}
            </h3>
          </div>

          {/* Price */}
          <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3 text-white">
            <span className="text-2xl sm:text-3xl font-black tracking-wide text-(--foreground)">
              {pricingPlan.price}
            </span>

            <span className="text-(--muted) text-xs sm:text-sm uppercase tracking-widest font-medium italic">
              {pricingPlan.duration}
            </span>
          </div>

          {/* Features */}
          <ul className="w-full px-3 sm:px-5">
            {pricingPlan.features.map((feature, idx) => (
              <li
                key={idx}
                className="py-2 sm:py-3 md:py-4 text-(--foreground) text-xs sm:text-sm text-center
            border-t border-(--border)
            transition-all duration-200 tracking-wide hover:tracking-wider
            last:border-b wrap-break-word"
              >
                {feature}
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            className="w-[90%] py-3 sm:py-3 md:px-12 md:py-3
        rounded-full font-normal uppercase  text-xs sm:text-sm
        transition-all duration-300 tracking-widest
        bg-(--button-color) text-white
        hover:shadow-(--footer-shadow)
        ring-2 ring-(--border)
        opacity-80
        "
          >
            {pricingPlan.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
