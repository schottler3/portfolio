import React from 'react';
import Header from '../components/Header';
import projectData from './projects.json';
import ProjectItem from '../components/ProjectItem';

interface ProjectItemType {
    index: number;
    start: string;
    end: string;
    title: string;
    tagline: string;
}

export default function Projects() {

    const projectItems: ProjectItemType[] = projectData;

    return (
        <div className="bg-charcoal min-h-screen w-full">
            <Header />
            <div className="pt-[16vh] w-full grid grid-cols-* gap-4">
                {projectItems.map(item => (
                    <div key={item.index}>
                        <ProjectItem
                            key={item.index}
                            index={item.index}
                            start={item.start}
                            end={item.end}
                            title={item.title}
                            tagline={item.tagline}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
