import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { menuLinks } from "@/constanst";
import { Outfit } from "next/font/google";

const font = Outfit({
  subsets: ["latin"],
  weight: ["400"],
});

export const Navbar = () => {
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-white px-6 lg:px-[440px] h-16 shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <p
          className={cn(
            "text-2xl font-fredoka font-bold text-dark-2 max-sm:hidden",
            font.className
          )}
        >
          😎 Konecta
        </p>
      </Link>

      {/* MENU OPTIONS */}
      <div className="flex">
        <ul className="hidden md:flex justify-center items-center space-x-4 gap-8 h-full">
          {menuLinks.map((item) => {
            return (
              <li key={item.id} className="flex justify-center items-center">
                <a
                  href={item.route}
                  className={cn(
                    "font-semibold text-base text-[#3D4751] hover:underline decoration-dark-2 h-full",
                    {
                      "underline decoration-dark-2": item.udernaline,
                    },
                    font.className
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        {/* <div className="flex gap-12">
          <section className="flex items-center justify-between max-sm:hidden">
            <ul className="hidden md:flex space-x-4 gap-8 h-full">
              {menuLinks.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex justify-center items-center"
                  >
                    <a
                      href={item.route}
                      className={cn(
                        "font-semibold text-base text-[#3D4751] hover:underline decoration-dark-2 h-full",
                        {
                          "underline decoration-dark-2": item.udernaline,
                        },
                        font.className
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div> */}
      </div>
    </nav>
  );
};
