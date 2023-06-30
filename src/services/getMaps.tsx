import useSWR from 'swr';

export function useGetPlaces() {
    const apiUrl = 'http://localhost:3000/places';

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