"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            {/* <Logo />  */}
            <Link href="/">
              <img
                src="/icefoss.png"
                alt="ICEFOSS Logo"
                className="w-32 h-auto object-contain"
              />
            </Link>
          </div>
          <ul className="hidden md:flex flex-1 items-center justify-around gap-10 ">
            <li>
              <img
                src="/logos/FISATLOGO.png"
                alt="ICEFOSS Logo"
                className="w-14 h-14 object-contain"
              />
            </li>
            <li>
              <img
                src="/logos/icc white.png"
                alt="ICEFOSS Logo"
                className="w-14 h-14  object-contain"
              />
            </li>
            <li>
              <img
                src="/logos/FFSC.png"
                alt="ICEFOSS Logo"
                className="w-14 h-14 object-contain"
              />
            </li>
            <li>
              <img
                src="/logos/ACM FISAT logo.png"
                alt="ICEFOSS Logo"
                className="w-14 h-14 object-contain"
              />
            </li>
          </ul>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            {/* <li>
              <Link
                href="/signin"
                className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Sign In
              </Link>
            </li> */}
            <li>
              <Link
                href="/register"
                className="btn-sm bg-linear-to-tr  from-[#FFE000] to-[#01F791]  text-black font-semibold bg-[length:100%_100%] bg-[bottom] py-[5px]  shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
