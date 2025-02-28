import React from 'react';
import axios from 'axios';
import './App.css';

// TODO: update to actual API response type
interface ApiResponse {
  data: any[];
}

function App() {

  const fetchPhotos = async () => {
    try {
      const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
      if(!apiKey) {
        throw new Error('API key not found');
      }

      const response = await axios.get<ApiResponse>(`https://api.pexels.com/v1/curated?per_page=15`, {
        headers: {
          Authorization: apiKey
        }
      });
    } catch (error) {
      console.error('Error fetching photos', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="App-link"
          onClick={fetchPhotos}
        >
          Click here to load photos
        </button>
      </header>
    </div>
  );
}

export default App;
