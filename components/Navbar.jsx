"use client";

import { useState } from "react";
import Link from "next/link";

import { links } from "@/links";
import Image from "next/image";

export default function Navbar() {
  const [openDropdowns, setOpenDropdowns] = useState([]);

  const toggleDropdown = (chapter) => {
    setOpenDropdowns((prev) =>
      prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter]
    );
  };

  return (
    <div className="flex h-screen">
      <nav
        className="w-64 bg-gradient-to-tr from-purple-800 to-purple-500 rounded-xl m-[2rem]
       text-white p-6 overflow-y-auto transition-all duration-100 hover:shadow-md hover:shadow-purple-500 flex flex-col gap-6"
      >
        <div className="flex gap-2 justify-center items-center">
          <Image
            width={50}
            height={50}
            draggable={false}
            className="select-none"
            src={"/three.png"}
            alt="three-js-logo"
          />
          <Link href="/" className="text-white font-bold">
            edu's threejs journey
          </Link>
        </div>
        <div className="flex flex-col">
          {links.map((chapter, index) => (
            <div key={index} className="flex flex-col">
              <button
                className={`w-full text-left hover:underline ${
                  openDropdowns.includes(chapter.title) ? "font-bold" : ""
                }`}
                onClick={() => toggleDropdown(chapter.title)}
              >
                {chapter.title}
              </button>

              <div
                className={`ml-4 mt-2 mb-4 flex flex-col gap-2 transition-all duration-500   ${
                  openDropdowns.includes(chapter.title)
                    ? "max-h-[30rem] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {chapter.links.map((lesson, lessonIndex) => (
                  <Link
                    key={lessonIndex}
                    href={`/${lesson.link}`}
                    className="block hover:underline"
                  >
                    {lesson.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
