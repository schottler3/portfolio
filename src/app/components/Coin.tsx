"use client"
import React, { useMemo } from 'react';

interface CoinProps {
    front: string;
    back: string;
    link: string;
}

export default function Coin({ front, back, link }: CoinProps) {
    const { baseSize, randomX, randomY } = useMemo(() => {
        const seed = front.length + back.length + link.length;
        
        return {
            baseSize: Math.max(back.length * 1.2, 8),
            randomX: (seed % 20) - 10, 
            randomY: ((seed * 13) % 20) - 10 
        };
    }, [front, back, link]);
    
    return (
        <div
            onClick={(event) => (event.currentTarget as HTMLDivElement).classList.toggle('flipped')}
            className={`hover:bg-slate-700 hover:border-aqua1 hover:border-4 bg-navy rounded-full 
                       items-center justify-center flex font-bold text-3xl disk relative bubble`}
            style={{
                width: `${baseSize}rem`,
                height: `${baseSize}rem`,
                minWidth: '8rem',
                minHeight: '8rem',
                '--random-x': `${randomX}px`,
                '--random-y': `${randomY}px`
            } as React.CSSProperties}
        >
            <div className="disk-front absolute w-full h-full flex items-center justify-center backface-hidden p-2">
                {front}
            </div>
            <div className="disk-back bg-blue1 rounded-full absolute w-full h-full flex items-center justify-center backface-hidden p-2">
                <a 
                    className="hover:text-slate-400 transition-colors duration-300 break-words text-center" 
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {back}
                </a>
            </div>
        </div>
    );
}