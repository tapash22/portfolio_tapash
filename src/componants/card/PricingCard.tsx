import type { PricingPlan } from "../../storage/type/data-type";

interface PricingCardProps {
  pricingPlan: PricingPlan;
}
export function PricingCard({ pricingPlan }: PricingCardProps) {
  return (
    <div
      key={pricingPlan.id}
      className={`relative w-full max-w-80 pt-14 transition-transform duration-500 group ${
        pricingPlan.highlight ? "scale-105" : "scale-100"
      }`}
    >
      {/* Top Floating Icon Circle */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center ring-1 ring-(--border) border-[#121212] z-30 ${
          pricingPlan.highlight
            ? "bg-(--neon-color) w-28 h-28"
            : "bg-(--sidebar) w-24 h-24"
        }`}
      >
        <span
          className={` text-3xl font-bold italic ${
            pricingPlan.highlight ? "text-(--foreground)" : "text-(--muted)"
          }`}
        >
          {pricingPlan.title[0]}
        </span>
      </div>

      {/* Moving Border Wrapper */}
      <div className="relative p-0.5 rounded-[55px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-3">
        {/* 360° Rotating Beam Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] animate-border-spin"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, transparent 280deg, var(--box-shadow) 360deg)`,
            }}
          />
        </div>

        {/* Main Card Content */}
        <div
          className={`
          relative z-10 bg-[#1c1c1c] rounded-[54px] overflow-hidden flex flex-col items-center pb-12 shadow-xl space-y-5
          border cursor-pointer transition-all duration-500
          ${pricingPlan.highlight ? "border-(--box-shadow)" : "border-(--border)"} 
          group-hover:border-transparent group-hover:shadow-(--box-shadow)
        `}
        >
          {/* Header Section */}
          <div
            className={`w-full pt-20 pb-10 flex justify-center ${
              pricingPlan.highlight ? "bg-(--neon-color)" : "bg-(--sidebar)"
            }`}
          >
            <h3 className="text-white text-3xl font-semibold tracking-tight">
              {pricingPlan.title}
            </h3>
          </div>

          {/* Price & Duration */}
          <div className=" flex flex-col items-center space-y-3 text-white">
            <div className="flex items-baseline">
              <span className="text-3xl font-black tracking-wide text-(--foreground)">
                {pricingPlan.price}
              </span>
            </div>
            <span className="text-(--muted) text-sm mt-1 uppercase tracking-widest font-medium italic">
              {pricingPlan.duration}
            </span>
          </div>

          {/* Features List */}
          <ul className="w-full px-8 mb-4">
            {pricingPlan.features.map((feature, idx) => (
              <li
                key={idx}
                className="py-4 text-(--foreground) text-sm text-center border-t tracking-wide border-(--border) last:border-b whitespace-nowrap"
              >
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className={` px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 bg-(--button-color) text-white hover:shadow-(--box-shadow) shadow-[0_0_20px_bg-(--button-color)]`}
          >
            {pricingPlan.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
