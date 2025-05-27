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
        <div className="flex flex-col p-2">
            
            <div>
                <div onClick={handleClick} className={expanded ? `text-aqua1 text-2xl font-bold hover:cursor-pointer` : `text-white font-bold text-2xl hover:cursor-pointer hover:text-blue1`}>
                    {name}
                </div>
                <h2>

                </h2>
            </div>
            <div className={expanded ? `block text-white hover:cursor-pointer` : `hidden`}>
                {towns && towns.length > 0 && (
                    <>
                        <div className="pl-2 mb-2">Member Towns:</div>
                        {towns.map((item: any, index: number) => (
                            <div key={`town-${index}`} className="pl-4 flex flex-col">
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
    