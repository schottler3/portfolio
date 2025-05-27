export type Coordinates = {
    x: number,
    y: number
}

export type Player = {
    username: string,
    uuid: string
}

export type Stats = {
    balance: number,
    numAllies: number,
    numEnemies: number,
    numResidents: number,
    numTownBlocks: number,
    numTowns: number
}

export type Status = {
    isNeutral: boolean,
    isOpen: boolean,
    isPublic: boolean
}