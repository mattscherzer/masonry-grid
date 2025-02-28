import React from 'react';
import styled from 'styled-components';
import usePhotos from '../hooks/usePhotos';

const PhotoList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const PhotoItem = styled.li`
    margin: 10px;
    img {
        width: 150px;
        height: auto;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 10px;
`;

const FetchButton = styled.button`
    background-color: #61dafb;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-bottom: 20px;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
        background-color: #999;
        cursor: not-allowed;
    }
`;
const PhotoGallery: React.FC = () => {
    const { photos, loading, error, fetchPhotos } = usePhotos();

    return (
        <div>
            <FetchButton onClick={fetchPhotos} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Photos'}
            </FetchButton>
            {error && <ErrorMessage>Error: {error}</ErrorMessage>}
            {photos.length > 0 && (
                <PhotoList>
                    {photos.map((photo) => (
                        <PhotoItem key={photo.id}>
                            <img src={photo.src.tiny} alt={photo.alt} />
                        </PhotoItem>
                    ))}
                </PhotoList>
            )}
        </div>
    );
};

export default PhotoGallery;