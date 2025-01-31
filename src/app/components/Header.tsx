"use client"
import React, { useEffect, useState } from 'react';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 440) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full p-2 fixed top-0 bg-white flex flex-row items-center justify-between z-50">
        <nav className="hidden xs:flex text-md sm:text-lg md:text-xl lg:text-2xl pl-4 text-blue1 select-none items-center h-full">
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
        <div>
          <svg
            onClick={() => setIsOpen(!isOpen)}
            className="pl-8 w-16 h-auto block xs:hidden"
            width="19"
            height="15"
            viewBox="0 0 19 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="0.5"
              x2="19"
              y2="0.5"
              stroke="black"
              className="transition-all duration-300 origin-center"
              style={{
                transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none'
              }}
            />
            <line
              y1="7.5"
              x2="19"
              y2="7.5"
              stroke="black"
              className={`transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
            />
            <line
              y1="14.5"
              x2="19"
              y2="14.5"
              stroke="black"
              className="transition-all duration-300 origin-center"
              style={{
                transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
              }}
            />
          </svg>
        </div>
        <div
          className={`
            w-min h-min bg-white
            fixed left-0
            transition-all duration-1000 ease-in-out
            ${isOpen
              ? 'opacity-100 visible top-20 pointer-events-auto'
              : 'opacity-0 invisible top-0 pointer-events-none'
            }`}
        >
          <div className="flex flex-col gap-6 p-6">
            <a href="/" className="hover:text-blue1">Home</a>
            <a href="/about" className="hover:text-blue1">About</a>
            <a href="/projects" className="hover:text-blue1">Projects</a>
            <a href="/contact" className="hover:text-blue1">Contact</a>
          </div>
        </div>
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
          <img className="max-h-16 max-w-auto select-none" src="/images/Sowilo.svg" alt="Logo" />
        </div>
        <nav className="flex items-center h-full text-blue1 pr-4 space-x-4 select-none *:hover:cursor-pointer">
          <a
            href="https://github.com/schottler3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img src="/images/github.svg" alt="GitHub" className="w-[8vw] max-w-16 min-w-8 h-auto" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucasschottler/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img src="/images/linkedin.png" alt="LinkedIn" className="w-[8vw] max-w-16 min-w-8 h-auto" />
          </a>
        </nav>
      </div>
    </div>
  );
}