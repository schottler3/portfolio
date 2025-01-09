import React from 'react';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
    return (
      <div className="w-full h-20 z-40 fixed top-0 bg-white flex flex-row items-center justify-between">
        <nav className="hidden xs:flex text-md sm:text-lg md:text-xl lg:text-2xl pl-4 text-blue1 select-none items-center h-full z-20">
          <a href="/" className="flex items-center h-full hover:text-3xl duration-500 no-underline">
            Home
          </a>
          <span className="mx-2 flex items-center h-full">/</span>
          <a href="/about" className="flex items-center h-full hover:text-3xl duration-500 no-underline">
            About
          </a>
          <span className="mx-2 flex items-center h-full">/</span>
          <a href="/projects" className="flex items-center h-full hover:text-3xl duration-500 no-underline">
            Projects
          </a>
          <span className="mx-2 flex items-center h-full">/</span>
          <a href="/contact" className="flex items-center h-full hover:text-3xl duration-500 no-underline">
            Contact
          </a>
        </nav>
        <nav className="flex items-center h-full text-blue1 pr-4 space-x-4 z-20 select-none *:hover:cursor-pointer">
          <a
            href="https://github.com/schottler3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img src="/images/github.svg" alt="GitHub" className="w-10 h-auto" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucasschottler/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img src="/images/linkedin.png" alt="LinkedIn" className="w-10 h-auto" />
          </a>
        </nav>
      </div>
    );
  }