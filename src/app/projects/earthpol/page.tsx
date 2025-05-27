"use client"
import { useEffect, useState } from "react"
import Nation from "./Nation";

interface NationItem {
  index: number;
  name: string;
}

export default function EarthPol() {

    const [nations, setNations] = useState<NationItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allCollapse, setAllCollapse] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
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
    }, [])

    return (
        <div className="bg-charcoal min-h-screen pl-16 pt-16">
            {loading ? (
                <div className="text-white p-4">Loading...</div>
            ) : error ? (
                <div className="text-red-500 p-4">Error: {error}</div>
            ) : !nations ? (
                <div className="text-white p-4">No data available</div>
            ) : (
                <div className="flex flex-col">
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
                            <Nation
                                key={index}
                                name={item.name}
                                collapse={expanded}
                            />
                        ))
                    }
                </div>
        )}
    </div>
)
}