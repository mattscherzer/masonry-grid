import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePhotoDetails from '../hooks/usePhotoDetails';
import { Photo } from '../services/pexels';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
`;

interface PhotoDetailProps {
    photo?: Photo;
    closeModal?: () => void;
}

const PhotoDetail: React.FC<PhotoDetailProps> = (props) => {
    const { id } = useParams<{ id: string }>();
    const { loading, error, photo } = usePhotoDetails(Number(id));
    const navigate = useNavigate();

    const closeModal =  (props.closeModal === undefined) ?
        () => navigate('/') :
        props.closeModal;
    

    if (props.photo) {
        return (
            <ModalOverlay onClick={closeModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={closeModal} />
                    <h2>{props.photo.alt}</h2>
                    <img src={props.photo.src.large2x} alt={props.photo.alt} style={{ maxWidth: '80%', maxHeight: '500px' }} />
                    <p>Photographer: {props.photo.photographer}</p>
                </ModalContent>
            </ModalOverlay>
        );
    }

    if (loading) {
        return (
            <ModalOverlay onClick={closeModal}>
                <ModalContent>Loading photo details...</ModalContent>
            </ModalOverlay>
        );
    }

    if (error) {
        return (
            <ModalOverlay onClick={closeModal}>
                <ModalContent>Error: {error}</ModalContent>
            </ModalOverlay>
        );
    }

    if (!photo) {
        return (
            <ModalOverlay onClick={closeModal}>
                <ModalContent>Photo not found</ModalContent>
            </ModalOverlay>
        );
    }

    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={props.closeModal} />
                <h2>{photo.alt}</h2>
                <img src={photo.src.large2x} alt={photo.alt} style={{ maxWidth: '80%', maxHeight: '500px' }} />
                <p>Photographer: {photo.photographer}</p>
            </ModalContent>
        </ModalOverlay>
    );
};

export default PhotoDetail;