import { Truck, Tag, Gift, Zap, ShieldCheck, Sparkles } from "lucide-react";

export function MarqueeBar() {
  const announcements = [
    { icon: ShieldCheck, text: "100% Quality Guaranteed" },
    { icon: Zap, text: "Fast 24h Processing" },
    // { icon: Gift, text: "Exclusive Deals Available" },
    { icon: Sparkles, text: "Premium Products ", highlight: true },

  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-yellow-400/20">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

      {/* Animated background shimmer */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer" />
      </div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] relative z-10">
        {[...announcements, ...announcements, ...announcements].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 whitespace-nowrap group"
            >
              {/* Icon with glow effect */}
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${item.highlight
                ? 'bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400/30 group-hover:scale-110'
                : 'bg-yellow-400/10 text-yellow-400/80 group-hover:bg-yellow-400/20 group-hover:text-yellow-400'
                }`}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Text */}
              <span className={`text-sm font-semibold tracking-wide uppercase transition-colors ${item.highlight
                ? 'text-white group-hover:text-yellow-400'
                : 'text-slate-200 group-hover:text-white'
                }`}>
                {item.text}
              </span>

              {/* Separator */}
              <span className="mx-3 text-yellow-400/30">•</span>
            </div>
          );
        })}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
    </div>
  );
}
