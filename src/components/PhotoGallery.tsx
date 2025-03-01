import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useGallery from '../hooks/useGallery';
import { Photo } from '../services/pexels';
import PhotoDetail from './PhotoDetail';

const GalleryContainer = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
`;

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 10px;
  grid-auto-rows: 10px;
`;

const GridItem = styled.div`
  break-inside: avoid;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s ease-in-out;
  }

  .placeholder {
    filter: blur(5px);
    z-index: 1;
  }

  .loaded {
    opacity: 1;
    z-index: 2;
  }

  .loading {
    opacity: 0;
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { photos, loading, error, fetchPhotos } = useGallery();
  const navigate = useNavigate();

  const openModal = (photo: Photo) => {
    setIsModalOpen(true);
    setSelectedPhoto(photo);
    navigate(`/photo/${photo.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
    navigate("/");
  }

  return (
    <GalleryContainer>
      <FetchButton onClick={fetchPhotos} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Photos'}
      </FetchButton>
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      <MasonryGrid>
        {photos.map((photo) => {
          const imageWidth = 250;
          const aspectRatio = photo.height / photo.width;
          const imageHeight = imageWidth * aspectRatio;
          const gridRowSpan = Math.ceil(imageHeight / 10);

          return (
            <GridItem 
                key={photo.id}
                style={{ gridRowEnd: `span ${gridRowSpan}` }} 
                onClick={() => openModal(photo)}
            >
              <img
                src={photo.src.tiny}
                alt={photo.alt}
                className="placeholder"
              />
              <img
                src={photo.src.large2x}
                alt={photo.alt}
                className="loaded loading"
                onLoad={(e) => {
                  e.currentTarget.classList.remove("loading");
                }}
              />
            </GridItem>
          );
        })}
      </MasonryGrid>
      {isModalOpen && selectedPhoto && (
        <PhotoDetail photo={selectedPhoto} closeModal={closeModal} />
      )}
    </GalleryContainer>
  );
};

export default PhotoGallery;