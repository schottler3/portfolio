"use client"
import React from 'react';

interface ProjectItemProps {
    title: string;
}

export default function ProjectItem({title}: ProjectItemProps) {

    return (
        <div className="w-full h-full flex flex-col items-center justify-around text-white border-blue1 bg-navy border-4 pl-4 pr-4">
            <div className="text-xl font-bold text-center">{title}</div>
        </div>
    );
}