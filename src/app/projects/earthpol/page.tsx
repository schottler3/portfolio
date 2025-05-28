"use client"
import { useEffect, useState } from "react"
import NationItem from "./NationItem";
import Header from "./Header";
import { FAKENATIONS } from "./types";

interface NationItem {
  index: number;
  name: string;
}

const usingFake: boolean = true;

export default function EarthPol() {

    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    useEffect(() => {
        if(usingFake){
            setNations(FAKENATIONS.map((nation, index) => ({
                ...nation,
                index
            })));
            setLoading(false);
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/earthpol/nations');
                    
                    if (!response.ok) {
                        throw new Error(`Error! Status: ${response.status}`);
                    }
                    
                    const result = await response.json();
                    console.log('Fetched data:', result);
                    setNations(result);
                    setLoading(false);
                } catch (e: unknown) {
                    const error = e instanceof Error ? e : new Error(String(e));
                    console.error('Error fetching data:', error);
                    if(!nations){
                        setError(error.message);
                        setLoading(false);
                    }
                    
                }
            };

            fetchData();
        }
    }, [])

    return (
        <>
            <Header>
                    
            </Header>
            
            <div className="bg-charcoal pt-20 min-h-screen oswald-earth">
                {loading ? (
                    <div className="text-white p-4">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 p-4">Error: {error}</div>
                ) : !nations ? (
                    <div className="text-white text-4xl flex flex-col justify-center h-screen items-center">
                        <h1>The server at</h1>
                        <a className="text-aqua1 font-bold" href="https://api.earthpol.com/astra/">https://api.earthpol.com/astra/</a>
                        <h1>appears to be down :(</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-[20%_80%] h-screen">
                        <div className="flex justify-center pt-10">
                            <div className="flex flex-col overflow-y-scroll no-scrollbar">
                                <div className="text-white hover:cursor-pointer flex items-center gap-2" onClick={() => setExpanded(!expanded)}>
                                    <svg 
                                        className={`w-4 h-4 transition-transform text-blue1 ${expanded ? 'rotate-180' : ''}`} 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                    <h2>
                                        {expanded ? 'Collapse All' : 'Expand All'}
                                    </h2>
                                </div>
                                {
                                    nations.map((item: NationItem, index: number) => (
                                        <NationItem
                                            key={index}
                                            name={item.name}
                                            collapse={expanded}
                                            selectedItem={selectedItem}
                                            setSelectedItem={setSelectedItem}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="bg-navy text-white text-4xl">
                            {selectedItem}
                        </div>
                    </div>
            )}
        </div>
    </>
)
}