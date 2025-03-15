"use client"
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import projectData from './projects.json' assert { type: 'json' };
import ProjectItem from '../components/ProjectItem';
import Storage from '../storage';

interface ProjectItemType {
    index: number;
    start: string;
    end?: string;
    title: string;
    tagline: string;
    description: string[];
    images?: string[];
    video?: string[];
    links?: {
        live?: string;
        git?: string;
    };
}

export default function Projects() {

    const projectItems: ProjectItemType[] = projectData as ProjectItemType[];
    const [selectedProject, setSelectedProject] = useState<ProjectItemType>(projectItems[0]);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (selectedProject && selectedProject.images) {
            // Load all image URLs for the selected project
            selectedProject.images.forEach(async (image) => {
                try {
                    const url = await Storage.getImageUrl(image);
                    setImageUrls(prev => ({
                        ...prev,
                        [image]: url
                    }));
                } catch (error) {
                    console.error("Error loading image:", error);
                }
            });
        }
    }, [selectedProject]);

    return (
        <div className="bg-charcoal min-h-screen">
            <Header />
            <div className="flex flex-col sm:grid sm:grid-cols-2 h-[100vh]">
                <div className="flex sm:grid max-h-[50vh] sm:min-h-full overflow-y-auto sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 p-8 pt-32">
                    {projectItems.map(item => (
                        <div 
                        key={item.index} 
                        className="aspect-[3/2] transform hover:scale-110 hover:cursor-pointer transition-all duration-300 ease-in-out origin-center"
                        onClick={() => setSelectedProject(item)}
                        >
                            <ProjectItem
                            title={item.title}
                            />
                        </div>
                    ))}
                </div>
                <div className="bg-gray1 h-full overflow-y-auto">
                    <div className="flex flex-col h-full pt-6 sm:pt-32">
                        {selectedProject ? (
                            <div className="p-4 items-center text-center text-white h-max">
                                <p className="text-4xl font-bold">{selectedProject.title}</p>
                                <p className="text-xl font-thin">{selectedProject.tagline}</p>
                                <div className="w-full flex flex-row justify-center items-center gap-2 text-aqua1 font-thin">
                                    <p className="text-center">{selectedProject.start}</p>
                                    {selectedProject.end ? <p className="text-left"> - {selectedProject.end}</p> : null}
                                </div>
                                <div>
                                    {selectedProject.description.map((paragraph, index) => (
                                        <div key={index} className="p-4 text-xl text-left text-white">
                                            <p>{paragraph}</p>
                                        </div>
                                    ))}
                                </div>
                                {selectedProject.links ? (
                                    <div className="flex flex-row ml-4 gap-4 *:hover:cursor-pointer *:p-4 text-xl text-center font-bold *:rounded-full *:w-48 *:bg-blue1 text-white items-center">
                                        {selectedProject.links.live ? (
                                            <a href={selectedProject.links.live} className="group hover:bg-charcoal">
                                                <p className="group-hover:text-aqua1">Project Link</p>
                                            </a>
                                        ) : null}
                                        {selectedProject.links.git ? (
                                            <a href={selectedProject.links.git} className="group hover:bg-charcoal">
                                                <p className="group-hover:text-aqua1">Github Repo</p>
                                            </a>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        <div className="">
                            {selectedProject && selectedProject.images && (
                                <div className="pb-8">
                                    {selectedProject.images.map((image, index) => (
                                        <div key={index} className="p-8">
                                            {imageUrls[image] ? (
                                                <img 
                                                    src={imageUrls[image]} 
                                                    alt={selectedProject.title} 
                                                    className="max-w-[90%]"
                                                />
                                            ) : (
                                                <div className="w-[90%] aspect-video bg-gray-200 animate-pulse" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedProject && selectedProject.video && (
                                <div className="p-4 flex flex-row">
                                {selectedProject.video.map((videoId, index) => {
                                    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
                                    
                                    return (
                                        <div className="w-full max-w-4xl aspect-video" key={index}>
                                            <iframe
                                                className="w-full h-full"
                                                src={embedUrl}
                                                title="YouTube video player"
                                                allow="picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
