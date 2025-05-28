import { useEffect, useState } from "react";
import { Player, ReactStateHandler, Town } from "./types";
import { renderTown, renderUUID } from "./queries";

export default function TownItem({name, selectedItem, setSelectedItem}: {name:string, selectedItem:string | null, setSelectedItem:ReactStateHandler}) {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [players, setPlayers] = useState<{"name": string, "uuid":string}[] | null>(null);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [townData, setTownData] = useState<Town | null>(null);
    const [imageData, setImageData] = useState<string | null>("");
    
    useEffect(() => {
        if(isRendered) return;
        
        const fetchTownData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const townObject = await renderTown(name);
                //console.log("Town data received:", townObject);
                setTownData(townObject);
                
            } catch (err) {
                console.error("Error fetching town data:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
                setIsRendered(true);
            }
        };
        
        fetchTownData();
    }, [name, isRendered]);

    function handleTownClick() : void {
        setSelectedItem(name);
    }

    function handleExpandClick() : void {
        setIsExpanded(!isExpanded);
    }

    async function handleUserClick(uuid: string) {
    console.log("Clicked UUID:", uuid);
    try {
        const user = await renderUUID(uuid);
        console.log("User data:", user);
        
        // Find the texture property in the array
        const textureProperty = user.properties.find(prop => prop.name === "textures");
        
        if (textureProperty && textureProperty.value) {
            // Base64 decode and extract the skin URL
            try {
                // For browser environment
                const decodedData = atob(textureProperty.value);
                const textureData = JSON.parse(decodedData);
                const skinUrl = textureData.textures?.SKIN?.url;
                
                console.log("Skin URL:", skinUrl);
                setImageData(skinUrl || null);
            } catch (error) {
                console.error("Error parsing texture data:", error);
                setImageData(null);
            }
        } else {
            console.log("No texture property found");
            setImageData(null);
        }
    } catch (error) {
        console.error("Error fetching player:", error);
        setImageData(null);
    }
}

    console.log(townData);

    return (
        <div className="mb-2">
            <div className={`
                relative flex items-center gap-2
                text-md font-bold hover:cursor-pointer
                ${isExpanded ? 'text-aqua1' : 'text-white hover:text-blue1'}
            `}>
                <svg 
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    onClick={handleExpandClick}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <div onClick={handleTownClick}>
                    {name}
                </div>
            </div>
            
            {isExpanded && (
                <div className="pl-6 mt-1">
                    {loading ? (
                        <div className="text-gray-400">Loading town data...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : !townData ? (
                        <div className="text-gray-400">No town data available</div>
                    ) : (
                        <div className="text-white">
                            <p>Mayor: {townData.mayor?.name || "None"}</p>
                            {townData.residents && townData.residents.length > 0 && (
                                <div>
                                    <p className="font-semibold mt-2">Residents:</p>
                                    <div className="pl-2 w-min">
                                        {townData.residents.map((resident, index:number) => (
                                            <div onClick={() => handleUserClick(resident.uuid)} key={resident.uuid || `resident-${index}`}>{resident.name}</div>
                                        ))}
                                        <img src={imageData}></img>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}