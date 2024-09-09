import { ICharacter, ICharacterResult } from "./interfaces/ICharacter";
import { IEpisode, IEpisodeResult } from "./interfaces/IEpisode";
import { ILocation, ILocationResult } from "./interfaces/ILocation";

const BASE_URL = "https://rickandmortyapi.com/api";
const CHARACTER_ROUTE = `${BASE_URL}/character`;
const LOCATION_ROUTE = `${BASE_URL}/location`;
const EPISODES_ROUTE = `${BASE_URL}/episode`;

const outputElement = document.getElementById("output") as HTMLDivElement;

const characterElement = document.getElementById(
  "api-character"
) as HTMLAnchorElement;
const locationElement = document.getElementById(
  "api-location"
) as HTMLAnchorElement;
const episodeElement = document.getElementById(
  "api-episode"
) as HTMLAnchorElement;

characterElement.addEventListener("click", async () => {
  try {
    const response = await fetch(CHARACTER_ROUTE);
    const data = await response.json();
    outputElement.innerHTML = "";
    console.log(data);
    data.results.forEach((result: ICharacterResult) => {
      const characterContainer = document.createElement(
        "div"
      ) as HTMLDivElement;
      characterContainer.className = "card";
      characterContainer.innerHTML = displayCharacter(result);
      outputElement.appendChild(characterContainer);
    });
  } catch (error) {
    console.error(error);
  }
});

function displayCharacter(character: ICharacterResult): string {
  const resultString = `
    <div>
    <p>Name: ${character.name}</p>
      <p>Status: ${character.status}</p>
      <p>Species: ${character.species}</p>
      <p>Gender: ${character.gender}</p>      
      <p>Origin: ${character.origin.name}</p>
      <p>Location: ${character.location.name}</p>
      </div>
      <img src="${character.image}" alt="${character.name}>
    `;
  return resultString;
}

locationElement?.addEventListener("click", async () => {
  try {
    const response = await fetch(LOCATION_ROUTE);
    const data = await response.json();
    outputElement.innerHTML = "";
    for (const result of data.results) {
      console.log(result);
      const locationContainer = document.createElement("div") as HTMLDivElement;
      locationContainer.className = "card";
      locationContainer.innerHTML = await displayLocation(result);
      outputElement.appendChild(locationContainer);
    }
  } catch (error) {
    console.error(error);
  }
});

async function displayLocation(location: ILocationResult): Promise<string> {
  const residents = await fetchResidents(location.residents);
  const resultString = `
  <div>
    <p>Name: ${location.name}</p>
    <p>Type: ${location.type}</p>
    <p>Dimension: ${location.dimension}</p>
    <p>Residents: ${residents}</p>
  </div>
  `;
  return resultString;
}

async function fetchResidents(locationResidents: string[]): Promise<string> {
  const resultArray: string[] = [];
  for (const resident of locationResidents) {
    try {
      const response = await fetch(resident);
      const data: ICharacterResult = await response.json();
      resultArray.push(data.name);
    } catch (error) {
      console.error(error);
    }
  }
  return resultArray.join(", ");
}

episodeElement?.addEventListener("click", async () => {
  try {
    const response = await fetch(EPISODES_ROUTE);
    const data = await response.json();
    outputElement.innerHTML = "";
    console.log(data);
    await Promise.all(
      data.results.map(async (result: IEpisodeResult) => {
        const episodeContainer = document.createElement(
          "div"
        ) as HTMLDivElement;
        episodeContainer.className = "card";
        episodeContainer.innerHTML = await displayEpisode(result);
        outputElement.appendChild(episodeContainer);
      })
    );
  } catch (error) {
    console.error(error);
  }
});

async function displayEpisode(episode: IEpisodeResult): Promise<string> {
  const residents = await fetchResidents(episode.characters);
  const resultString = `
    <div>
      <p>Name: ${episode.name}</p>
      <p>Air date: ${episode.air_date}</p>
      <p>Episode: ${episode.episode}</p>
      <p>Characters: ${residents}</p>
    </div>
    `;
  return resultString;
}
