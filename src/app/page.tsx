"use client"

import React, { useCallback, useEffect, useState } from 'react';
import type { Snowflake } from './types/Snowflake';
import Header from './components/Header';


export default function Home() {

  const [snowFlakes, setSnowFlakes] = useState<Snowflake[]>([]);

  //Snowflake generation
  useEffect(() => {
    setSnowFlakes(Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      size: Math.random() * 16 + 8,
      clicked: false,
      fallDuration: Math.random() * 32 + 32,
    })));
  }, []);

  //Snowflake click handler
  const handleSnowflakeClick = useCallback((id: number) => {
    console.log('clicked', id);
    setSnowFlakes(prevFlakes => 
      prevFlakes.map(flake => 
        flake.id === id 
          ? { ...flake, clicked: true }
          : flake
      )
    );
  }, []);

  //Snowflake opacity transition end handler
  const handleOpacityEnd = useCallback((id: number, event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName === 'opacity') {
      const target = event.target as HTMLElement;
      if (getComputedStyle(target).opacity === '0') {
        setSnowFlakes(prevFlakes => 
          prevFlakes.map(flake => 
            flake.id === id 
              ? {
                  ...flake,
                  x: Math.random() * 100,
                  y: Math.random() * 50,
                  clicked: false
                }
              : flake
          )
        );
      }
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 bg-charcoal">
        <div className="fixed bottom-0 bg-index-background bg-cover bg-center h-[60%] w-full z-0"></div>
        <div className="fixed bottom-0 bg-white w-full z-10 bg-center h-5"></div>
        <Header />
        <div className="overflow-hidden z-10">
          {snowFlakes.map(flake => (
            <div
              onClick={() => handleSnowflakeClick(flake.id)}
              onTransitionEnd={(e) => handleOpacityEnd(flake.id, e)}
              key={flake.id}
              className={`absolute snowflake z-10 hover:cursor-pointer ${flake.clicked ? 'clicked' : ''}`}
              style={{
                left: `${flake.x}vw`,
                top: `${flake.y}vh`,
                transform: `translateY(${flake.y}vh)`,
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                animation: `movement ${flake.fallDuration}s linear infinite`,
                '--fall-duration': `${flake.fallDuration}s`
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="w-full z-40 relative">
          <div className="pl-[10vw] pt-[32vh]">
            <h1 className="text-aqua1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold duration-500 z-40">
              Welcome to
            </h1>
            <h1 className="text-aqua1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pt-2 duration-500 z-40">
              LucasSchottler.dev
            </h1>
            <h1 className="text-blue1 text-lg sm:text-xl md:text-2xl lg:text-3xl pt-10 duration-500 z-40">
              A portfolio site by Lucas Schottler
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}