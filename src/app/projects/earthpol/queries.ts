import {FAKENATION, FAKETOWN, Nation, Player, Town } from "./types";

const usingFake: boolean = true;

export const renderNation = async (query: string): Promise<Nation | null> => {
    if(usingFake){
        const nat : Nation = FAKENATION[0] as any;
        return nat;
    }
    try {
        const response = await fetch('/api/earthpol/nations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            console.log(`Error fetching nation data. Status: ${response.status}`);
            return null;
        }
        
        const nationDataInc = await response.json();

        const nationObject = nationDataInc[0];
        return nationObject;
    } catch (error: any) {
        console.log(error);
        return null;
    }
};

export const renderTown = async (query: string): Promise<Town> => {
    if(usingFake){
        return FAKETOWN[0] as any;
    }
    try {
        const response = await fetch('/api/earthpol/towns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: [query]
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching town data. Status: ${response.status}`);
        }
        
        const townDataInc = await response.json();

        const townObject = townDataInc[0];
        return townObject;
    } catch (error: any) {
        return error;
    }
};

export const renderUUID = async(query: string): Promise<Player> => {
    // Use fake data if usingFake is true
    if(usingFake) {
        // Return a fake player object matching your Player type
        return {
            id: "9a2657ea-e15c-4469-8886-6c101151eff0",
            name: "jhjhjh098k",
            properties: [
                {
                    name: "textures",
                    value: "some-base64-value"
                }
            ],
            profileActions: []
        };
    }
    
    try {
        const response = await fetch(`/api/earthpol/mojang?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching mojang data. Status: ${response.status}`);
        }
        
        const responseData = await response.json();
        
        if (!responseData) {
            throw new Error('No player data received');
        }
        
        const newPlayer: Player = {
            id: responseData.id || "",
            name: responseData.name || "",
            properties: responseData.properties || [],
            profileActions: responseData.profileActions || []
        };
        
        return newPlayer;
    } catch (error: any) {
        console.error("Error in renderUUID:", error);
        return {
            id: query,
            name: "Unknown Player",
            properties: [],
            profileActions: []
        };
    }
};

