import axios from 'axios';

export interface Photo {
    id: number;
	width: number;
	height: number;
	url: string;
	photographer: string;
	photographer_url: string;
	photographer_id: number;
	avg_color: string;
	src: {
		original: string;
		large2x: string;
		large: string;
		medium: string;
		small: string;
		portrait: string;
		landscape: string;
		tiny: string;
	};
	liked: boolean;
	alt: string;
}
  
export interface PexelsResponse {
    photos: Photo[];
    page: number;
    per_page: number;
    total_results: number;
    prev_page?: string;
    next_page?: string;
}

const cache: { [key: string]: { data: unknown; timestamp: number } } = {};
const CACHE_EXPIRY_MS = 1000 * 60 * 5; // 5 minutes

const getPhotos = async (per_page: number = 15, page: number = 1): Promise<PexelsResponse> => {
    const cacheKey = 'photoGallery';

    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_EXPIRY_MS) {
        return cache[cacheKey].data as PexelsResponse;
    }

    try {
        const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
        if (!apiKey) {
            throw new Error("API key is missing.");
        }

        const response = await axios.get<PexelsResponse>(
            `https://api.pexels.com/v1/curated?per_page=${per_page}&page=${page}`,
            {
                headers: {
                    Authorization: apiKey,
                },
            }
        );

        const data = response.data;
        cache[cacheKey] = { data, timestamp: Date.now() };
        return data;
    } catch (error: any) {
        console.error("Error fetching photos", error);
        throw error; 
    }
};

const getPhoto = async (id: number): Promise<Photo> => {
    const cacheKey = `photo-${id}`;

    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_EXPIRY_MS) {
        return cache[cacheKey].data as Photo;
    }

    try {
        const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
        if (!apiKey) {
            throw new Error("API key is missing.");
        }
    
        const response = await axios.get<Photo>(
            `https://api.pexels.com/v1/photos/${id}`,
            {
            headers: {
                Authorization: apiKey,
            },
            }
        );
        
        const data = response.data;
        cache[cacheKey] = { data, timestamp: Date.now() };
        return data;
    } catch (error: any) {
        console.error("Error fetching photo", error);
        throw error;
    }
}

export { getPhotos, getPhoto };