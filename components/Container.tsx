import { cn } from "@/lib/ui";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[84rem] px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
