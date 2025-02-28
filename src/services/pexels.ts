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

const getPhotos = async (): Promise<PexelsResponse> => {
  try {
    const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
    if (!apiKey) {
      throw new Error("API key is missing.");
    }

    const response = await axios.get<PexelsResponse>(
      'https://api.pexels.com/v1/curated?per_page=30',
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching photos", error);
    throw error; 
  }
};

export { getPhotos };