"use client"
import React from 'react';

interface ProjectItemProps {
    title: string;
}

export default function ProjectItem({title}: ProjectItemProps) {

    return (
        <div className="w-full h-full flex flex-col items-center text-center justify-around text-white border-blue1 bg-navy border-4 p-4">
            <div className="text-xl font-bold">{title}</div>
        </div>
    );
}