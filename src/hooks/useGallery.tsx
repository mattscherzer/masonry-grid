import { useCallback, useState } from 'react';
import { getPhotos, Photo, PexelsResponse } from '../services/pexels';

const useGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data: PexelsResponse = await getPhotos(15, page);
      setPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
      setHasMore(data.next_page !== undefined);
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch photos');
      setLoading(false);
    }
  }, [page]);

  const loadMore = () => {
    if(!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }

  return { photos, loading, error, hasMore, page, fetch, loadMore };
};

export default useGallery;