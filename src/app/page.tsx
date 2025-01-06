import React from 'react';

import Header from './components/Header';

export default function Home() {
  return (
    <div className="bg-charcoal min-h-screen w-full overflow-x-hidden">
      <div className="fixed bottom-0 bg-index-background bg-cover bg-center h-[50%] w-screen z-0"></div>
      <div className="fixed bottom-0 bg-white w-screen z-10 bg-center h-5"></div>
      <Header />
      <div className="w-full">
        <div className="pl-[10vw] pt-[32vh]">
          <h1 className="text-aqua1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold duration-500">
            Welcome to
          </h1>
          <h1 className="text-aqua1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pt-2 duration-500">
            schottler3.github.io
          </h1>
          <h1 className="text-blue1 text-lg sm:text-xl md:text-2xl lg:text-3xl pt-10 duration-500">
            A portfolio site by Lucas Schottler
          </h1>
        </div>
      </div>
    </div>
  );
}