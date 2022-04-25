import React from "react";
import Logo from "public/images/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import propTypes from "prop-types";

export default function Header({ onLight }) {
  const linkColor = onLight ? "text-gray-900" : "text-white";
  const router = useRouter();
  const linkCTA =
    router.pathname.indexOf("/login") > -1
      ? `${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/register`
      : `${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/login`;
  const textCTA = router.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";
  return (
    <header className="flex justify-between items-center">
      <div style={{ height: 50 }}>
        <Logo className="on-dark"></Logo>
      </div>
      <ul className="flex">
        <li>
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
              ].join(" ")}
            >
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
              ].join(" ")}
            >
              Pricing
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
              ].join(" ")}
            >
              Features
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a
              className={[
                linkColor,
                "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
              ].join(" ")}
            >
              Story
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={linkCTA}
              className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 font-medium ml-6"
            >
              {textCTA}
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};
