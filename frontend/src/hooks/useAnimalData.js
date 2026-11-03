import { useQuery } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000';

export function useAnimalData() {
    // Kaikkien eläinten hakeminen
    const { 
        data: animals = [], 
        isLoading: animalsLoading, 
        error: animalsError 
    } = useQuery({
        queryKey: ['animals'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/animals`);
            if (!res.ok) throw new Error('Eläinten haku epäonnistui');
            return res.json();
        }
    });

    return {
        animals,
        animalsLoading,
        animalsError
    };
}

export function useAnimal(id) {
    return useQuery({
        queryKey: ['animal', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/animals/${id}`);
            if (!res.ok) throw new Error('Eläintä ei löytynyt');
            return res.json();
        },
        enabled: !!id // Hakee vain jos ID on olemassa
    });
}