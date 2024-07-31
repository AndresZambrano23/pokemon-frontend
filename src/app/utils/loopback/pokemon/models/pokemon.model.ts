export interface Pokemon {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[]
}

interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonDetail {
  abilities: Abilities[];
  name: string;
}


export interface Abilities {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface Ability {
  name: string;
  url: string;
}
