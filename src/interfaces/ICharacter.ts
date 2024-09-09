export interface ICharacter {
  info: IInfo;
  results: ICharacterResult[];
}

export interface IInfo {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface ICharacterResult {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export interface ILocation {
  name: string;
  url: string;
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
