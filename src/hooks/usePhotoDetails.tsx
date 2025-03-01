import { useState, useEffect } from 'react';
import { getPhoto, Photo } from '../services/pexels';

const usePhotoDetails = (id: number | undefined): { photo: Photo | null; loading: boolean; error: string | null } => {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!id) return; // Don't fetch if there's no ID

            setLoading(true);
            setError(null);
            try {
                const fetchedPhoto = await getPhoto(id);
                setPhoto(fetchedPhoto);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch photo details');
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [id]);

    return { photo, loading, error };
};

export default usePhotoDetails;