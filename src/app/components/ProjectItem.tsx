"use client"
import React from 'react';

interface ProjectItemProps {
    index: number;
    date: string;
    title: string;
    tagline: string;
    description: HTMLParagraphElement;
}

export default function ProjectItem({index, date, title, description }: ProjectItemProps) {

    return (
        <div></div>
    );
}