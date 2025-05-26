import { useState } from "react";

export default function Nation({ name }: { name: string }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [towns, setTowns] = useState<string[] | null>(null);
    const [expanded, setExpanded] = useState(false);

    const handleClick = async() => {
        if(!expanded){
            try {
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
                    throw new Error(`Error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Nation data:', data);
                setTowns(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setExpanded(!expanded);
    }


    return (
        <div className="flex flex-col  p-2">
            <div onClick={handleClick} className={expanded ? `text-aqua1 text-2xl font-bold hover:cursor-pointer` : `text-white font-bold text-2xl hover:cursor-pointer hover:text-blue1`}>
                {name}
            </div>
            <div className={expanded ? `block text-white hover:cursor-pointer` : `hidden`}>
                {towns}
            </div>
        </div>
    )
}
    