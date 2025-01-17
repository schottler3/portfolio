"use client"
import React from 'react';

interface ProjectItemProps {
    index: number;
    start: string;
    end: string;
    title: string;
    tagline: string;
}

export default function ProjectItem({start, end, title, tagline}: ProjectItemProps) {

    return (
        <div className="w-full h-full flex flex-col items-center justify-around text-white border-white border-2">
            <div>{title}</div>
            <div>{start} - {end}</div>
            <div>{tagline}</div>
        </div>
    );
}