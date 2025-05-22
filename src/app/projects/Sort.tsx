import React, { JSX, Dispatch, SetStateAction } from "react";
import { ProjectItemType } from "./types";

export default function Sort({projectItems, setProjectItems}: {projectItems: ProjectItemType[]; setProjectItems: Dispatch<SetStateAction<ProjectItemType[]>>;}): JSX.Element {

    const [sortOpen, setSortOpen] = React.useState(false);
    const [sortType, setSortType] = React.useState("date");

    return (
        <div className="flex flex-col gap-2 select-none transform-all duration-600 ease-in-out">
            <div onClick={() => setSortOpen(!sortOpen)} className="group flex flex-row items-center gap-2 hover:cursor-pointer w-min">
                <h1 className="text-lg font-bold text-white">
                    Sort 
                </h1>
                <svg className="group-hover:stroke-blue1 stroke-white" width="11" height="21" viewBox="0 0 22 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9764 24.6976L11.1513 37L3.00009 24.6976" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M3.02368 17.3024L10.8488 5L19 17.3024" strokeWidth="5" strokeLinecap="round"/>
                </svg>
            </div>
            <div className={`flex w-min flex-col gap-2 4rounded-lg transition-all duration-500 ease-in-out ${
                sortOpen 
                    ? 'opacity-100 max-h-96' 
                    : 'opacity-0 max-h-0 p-0 m-0'
            }`}>
                <div className="flex flex-row gap-2 *:border-2 *:border-white *:w-max *:rounded *:p-2 *:text-aqua1 *:bg-navy">
                        <button onClick={() => {
                            const sortedItems = [...projectItems].sort((a, b) => a.title.localeCompare(b.title));
                            setProjectItems(sortedItems);
                        }} className="hover:bg-blue1 hover:text-white hover:border-aqua1">Title</button>
                        <button onClick={() => {
                            const sortedItems = [...projectItems].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
                            setProjectItems(sortedItems);
                        }} className="hover:bg-blue1 hover:text-white hover:border-aqua1">Start Date</button>
                        <button onClick={() => {
                            const sortedItems = [...projectItems].sort((a, b) => {
                                if (a.end && b.end) {
                                    return new Date(a.end).getTime() - new Date(b.end).getTime();
                                }
                                return 0;
                            });
                            setProjectItems(sortedItems);
                        }} className="hover:bg-blue1 hover:text-white hover:border-aqua1">End Date</button>
                    </div>
                </div>
        </div>
    )
}