import { Poppins } from "next/font/google";
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

/**
 * @param {string} label
 */
export const Header = ({
    label,
}) => {
   return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className={cn(
            "text-3xl font-semibold",
            font.className
        )}>
            😎 Konecta
        </h1>
        <p className="text-muted-foreground text-sm">
            {label}
        </p>
    </div>
   )
}

Header.propTypes = {
    label: PropTypes.string.isRequired,
}
