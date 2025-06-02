"use client"
import React from 'react';

interface TimelineItemProps {
    index: number;
    date: string;
    title: string;
    location: string;
    description: string;
}

export default function TimelineItem({index, date, title, location, description }: TimelineItemProps) {

    if(index % 2 === 0) {
        return (
            <div className="pr-16 pl-16 w-full relative flex flex-col gap-2 items-end overflow-hidden">
                <div className="text-aqua1 text-2xl text-right font-bold">{date}</div>
                <div className="w-32vw bg-navy p-4 rounded-md relative timeline-item ">
                    <div className="absolute -right-2 top-1/2 w-4 h-4 bg-aqua1 border-l border-b border-4 border-white z-10 rotate-45 transform -translate-y-1/2"></div>
                    <div className="absolute -right-32 top-1/2 w-32 h-1 bg-white transform -translate-y-1/2"></div>
                    <div className="text-blue1 text-lg font-bold">{title}</div>
                    <div className="text-blue1 text-md font-bold">{location}</div>
                    <div className="text-white text-md">{description}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="pr-16 pl-16 w-full relative flex flex-col gap-2 items-start overflow-hidden">
                <div className="text-aqua1 text-left text-2xl font-bold">{date}</div>
                <div className="w-32vw bg-navy p-4 rounded-md relative timeline-item">
                    <div className="absolute -left-2 top-1/2 w-4 h-4 bg-aqua1 border-r border-t border-4 border-white z-10 rotate-45 transform -translate-y-1/2"></div>
                    <div className="absolute -left-32 top-1/2 w-32 h-1 bg-white transform -translate-y-1/2"></div>
                    <div className="text-blue1 text-lg font-bold">{title}</div>
                    <div className="text-blue1 text-md font-bold">{location}</div>
                    <div className="text-white text-md">{description}</div>
                </div>
            </div>
        );
    }
}