export interface Network {
    id: number,
    elo?: number,
    name: string,
    number_of_features: number,
    number_of_games: number,
    created_at: string,
    updated_at: string
}

export interface Game {
    id: number,
    data: string,
    created_at: string,
    updated_at: string
}
