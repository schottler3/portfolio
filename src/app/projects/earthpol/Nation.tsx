import { useState } from "react";
import {Status, Stats, Player, Coordinates} from "./types";
import {Town} from "./Town"

export type Nation = {
    allies: Nation[];
    board: string;
    capital: Town;
    coordinates: Coordinates;
    enemies: Nation[];
    king: Player;
    name: string;
    ranks: {
        coleader: Player[];
        minister: Player[];
        recruiter: Player[];
        soldier: Player[];
        general: Player[];
    };
    residents: Player[];
    sanctioned: Town[];
    stats: Stats;
    status: Status;
    timestamps: {
        registered: number;
    };
    towns: Town[];
    uuid: string;
}

export function nationCast(json: any): Nation {
    return {
        allies: json.allies || [],
        board: json.board || "",
        capital: json.capital || {},
        coordinates: json.coordinates || { x: 0, y: 0, z: 0 },
        enemies: json.enemies || [],
        king: json.king || {},
        name: json.name || "",
        ranks: {
            coleader: json.ranks?.coleader || [],
            minister: json.ranks?.minister || [],
            recruiter: json.ranks?.recruiter || [],
            soldier: json.ranks?.soldier || [],
            general: json.ranks?.general || [],
        },
        residents: json.residents || [],
        sanctioned: json.sanctioned || [],
        stats: json.stats || {},
        status: json.status || "",
        timestamps: {
            registered: json.timestamps?.registered || 0,
        },
        towns: json.towns || [],
        uuid: json.uuid || "",
    };
}

export default function Nation({ name }: { name: string }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [towns, setTowns] = useState<{name: string}[] | null>(null);
    const [nationData, setNationData] = useState<{data: Nation} | null>(null);
    const [expanded, setExpanded] = useState(false);

    const handleClick = async() => {
        // Toggle expanded state if we already have data
        if(towns || error) {
            setExpanded(!expanded);
            return;
        }
        
        // Only fetch if we're expanding and don't have data yet
        if(!expanded) {
            setLoading(true);
            setError(null);
            try {
                // First fetch to get nation data
                const response = await fetch('/api/earthpol/nations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: [name]
                    }),
                });
                
                if (!response.ok) {
                    throw new Error(`Error fetching nation data. Status: ${response.status}`);
                }
                
                const nationDataInc = await response.json();
                console.log('Nation data:', nationDataInc);

                const nationObject = nationCast(nationDataInc[0]);
                setNationData({ data: nationObject });
                setTowns(nationObject.towns);
            } catch (error: any) {
                console.error('Error:', error);
                setError(error.message || 'An error occurred fetching nation data');
            } finally {
                setLoading(false);
                setExpanded(true);
            }
        } else {
            setExpanded(false);
        }
    }


    return (
        <>
            <div className="flex flex-col p-2">
                <div className="flex gap-2 items-center">
                    <div onClick={handleClick} className={`
                        relative flex items-center gap-2
                        text-2xl font-bold hover:cursor-pointer
                        ${expanded ? 'text-aqua1' : 'text-white hover:text-blue1'}
                    `}>
                        <svg 
                            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        {name}
                    </div>
                    <h2 className="text-md text-gray-400">
                        {nationData?.data?.board != "/nation set board [msg]" ? nationData?.data?.board : ""}
                    </h2>
                </div>
                <div 
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${expanded 
                    ? 'max-h-[500px] opacity-100 translate-y-0' 
                    : 'max-h-0 opacity-0 -translate-y-2'
                    }
                `}
                >
                    {loading && <div className="pl-2">Loading...</div>}
                    {error && <div className="pl-2 text-red-500">{error}</div>}
                    {towns && towns.length > 0 && (
                    <div className="text-gray-400 pl-2 mb-2">
                        <div className="">Member Towns:</div>
                        {towns.map((item: any, index: number) => (
                            <div key={`town-${index}`} className="flex flex-col">
                            <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                    )}
                    {towns && towns.length === 0 && (
                        <div className="pl-2">No towns found</div>
                    )}
                </div>
            </div>
        </>
    )
}
    