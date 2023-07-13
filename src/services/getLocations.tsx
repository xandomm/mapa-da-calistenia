import useSWR from 'swr';
export interface Location {
    place_id: number;
    licence: string;
    powered_by: string;
    osm_type: string;
    osm_id: number;
    boundingbox: [string, string, string, string];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
  }

export async function getLocation(name: string) {
    const apiUrl = `https://geocode.maps.co/search?q={${name}}`;

    const fetcher = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    const response = fetcher(apiUrl);

    return response;
}