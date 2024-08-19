
import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
const font = Outfit({
    subsets: ["latin"],
    weight: ["600"],
  });

export const SectionTittle = ({ title, subtitle, btonTitle}) => {
    return (
        <div className="flex items-center lg:px-[440px] bg-white h-full">
            <div className="flex flex-col pt-16 h-full justify-center gap-2">
                <h1 className={cn("font-extrabold text-2xl", font.className)}>{title}</h1>
                <span>{subtitle}</span> 
            </div>
        </div>
    );
}