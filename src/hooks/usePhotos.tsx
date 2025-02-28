import { useState } from 'react';
import { getPhotos, Photo, PexelsResponse } from '../services/pexels';

const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Handle pagination
  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: PexelsResponse = await getPhotos();
      setPhotos(data.photos);
      
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch photos');
      setLoading(false);
    }
  };

  return { photos, loading, error, fetchPhotos };
};

export default usePhotos;