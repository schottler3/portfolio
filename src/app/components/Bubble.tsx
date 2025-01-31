"use client"
import React, { useMemo } from 'react';

interface BubbleProps {
    front?: string;
    back?: string;
    link?: string;
    bubbleSize?: number;
    aqua?: boolean;
}

export default function Bubble({ front, back, link, bubbleSize = 0, aqua = false}: BubbleProps) {
    const { baseSize, randomX, randomY} = useMemo(() => {
        const seed = front && back && link ? front.length + back.length + link.length : bubbleSize / 4 || 0;
        
        return {
            baseSize: back ? back.length - 2 : 0,
            randomX: (seed % 20) - 10, 
            randomY: ((seed * 13) % 20) - 10 
        };
    }, [front, back, link, bubbleSize]);
    
    return (
        <div
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                const target = event.currentTarget;
                if (front) {
                    target.classList.toggle('flipped');
                } 
                else if (bubbleSize) {
                    target.classList.toggle(aqua ? 'popAqua' : 'popBlue');
                }
            }}
            className={`${
                bubbleSize
                    ? (aqua ? 'bg-aqua1' : 'bg-blue1')
                    : 'hover:border-aqua1 hover:border-4 hover:bg-slate-700 bg-navy'
            } rounded-full 
                items-center justify-center flex font-bold text-md sm:text-xl md:text-2xl lg:text-3xl disk bubble
                aspect-square relative border-2 border-slate-500 shadow-sm shadow-slate-600`}
            style={{
                width: bubbleSize ? `${bubbleSize}vmax` : `${baseSize}vmax`,
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