import { Sparkles, Truck, Tag, Gift } from "lucide-react";

export function MarqueeBar() {
  // Sale announcements - admin can easily update these
  const announcements = [
    { icon: Tag, text: "SUMMER SALE - UP TO 50% OFF" },
    { icon: Truck, text: "FREE SHIPPING ON ORDERS OVER $75" },
    { icon: Gift, text: "BUY 2 GET 1 FREE ON SELECTED ITEMS" },
    { icon: Sparkles, text: "NEW ARRIVALS - PREMIUM CAR CARE PRODUCTS" },
  ];

  return (
    <div className="relative bg-primary overflow-hidden  ">
      <div className="relative flex">
        {/* First marquee group */}
        <div className="flex animate-marquee whitespace-nowrap">
          {announcements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`first-${index}`}
                className="flex items-center gap-3 px-8 py-3"
              >
                <Icon className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-bold text-primary-foreground tracking-wide">
                  {item.text}
                </span>
                <span className="text-primary-foreground/40 text-xl">•</span>
              </div>
            );
          })}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
          {announcements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`second-${index}`}
                className="flex items-center gap-3 px-8 py-3"
              >
                <Icon className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-bold text-primary-foreground tracking-wide">
                  {item.text}
                </span>
                <span className="text-primary-foreground/40 text-xl">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}