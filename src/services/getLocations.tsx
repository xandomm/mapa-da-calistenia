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

export async function useGetLocation(name: string) {
    const apiUrl = `https://geocode.maps.co/search?q={${name}}`;

    const fetcher = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    const { data, error } = useSWR(apiUrl, fetcher);

    return {
        places: data,
        isLoading: !error && !data,
        isError: error,
    };
}