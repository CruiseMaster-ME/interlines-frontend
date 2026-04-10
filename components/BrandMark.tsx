import Image from "next/image";
import { cn } from "@/lib/ui";

const WHITE_LOGO = {
  src: "/assets/logos/logo-white.png",
  width: 2119,
  height: 480,
} as const;

const TEAL_LOGO = {
  src: "/assets/logos/logo-teal.png",
  width: 2072,
  height: 470,
} as const;

export default function BrandMark({
  inverse = false,
  showRules = false,
}: {
  inverse?: boolean;
  showRules?: boolean;
}) {
  const logo = inverse ? WHITE_LOGO : TEAL_LOGO;
  const ruleTone = inverse
    ? "to-[color:rgba(223,200,157,0.5)]"
    : "to-[color:rgba(201,169,110,0.45)]";

  const mark = (
    <span className="inline-flex items-center leading-none">
      <Image
        src={logo.src}
        alt="Interline Cruises Middle East"
        width={logo.width}
        height={logo.height}
        className={cn(
          "h-[2.8rem] w-auto sm:h-[3.15rem] md:h-[3.35rem]",
          inverse && "drop-shadow-md",
        )}
      />
    </span>
  );

  if (!showRules) {
    return mark;
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <span className={cn("h-px w-12 bg-gradient-to-r from-transparent", ruleTone)} />
      {mark}
      <span className={cn("h-px w-12 bg-gradient-to-l from-transparent", ruleTone)} />
    </div>
  );
}
