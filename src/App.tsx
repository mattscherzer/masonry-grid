import styled from 'styled-components';
import PhotoGallery from './components/PhotoGallery';

const AppContainer = styled.div`
  text-align: center;
  font-family: sans-serif;
`;

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px;
`;

function App() {
  return (
    <AppContainer>
      <AppHeader>
        <h1>Pexels Photo Gallery</h1>
        <PhotoGallery />
      </AppHeader>
    </AppContainer>
  );
}

export default App;