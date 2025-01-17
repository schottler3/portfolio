import React from 'react';
import Header from '../components/Header';
import projectData from './projects.json' assert { type: 'json' };
import ProjectItem from '../components/ProjectItem';

interface ProjectItemType {
    index: number;
    start: string;
    end: string;
    title: string;
    tagline: string;
}

export default function Projects() {

    const projectItems: ProjectItemType[] = projectData as ProjectItemType[];

    return (
        <div className="bg-charcoal min-h-screen w-screen">
            <Header />
            <div className="grid grid-cols-2 min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                    {projectItems.map(item => (
                    <div key={item.index} className="aspect-[3/2]">
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
                <div className="bg-[rgb(50,61,60)]">
                    a
                </div>
            </div>
        </div>
    )
}
