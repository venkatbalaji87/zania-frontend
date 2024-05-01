import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import ImageViewer from './components/ImageViewer';
import Spinner from './components/Spinner';
import { fetchData, saveData } from './services/api';


function DocumentCard() {
  const [data, setData] = useState([]);
  const [overlayImage, setOverlayImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseOverlay();
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchDataFromStorage = async () => {
      const storedData = await fetchData();
      if (storedData) {
        setData(storedData);
      }
    };
    fetchDataFromStorage();
  }, []);

  // Function to handle card click and display overlay image
  const handleCardClick = (imageSrc) => {
      setOverlayImage(imageSrc);
    };

 
  // Function to handle overlay close
  const handleCloseOverlay = () => {
    setOverlayImage(null);
  };

  // Function to handle drag end and update data order
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  // Function to save data to localStorage and reset saving state
  const saveDataToStorage = async () => {
    setSaving(true);
    await saveData(data);
    setSaving(false);
    setLastSaveTime(new Date().toLocaleTimeString());
  };

  // Periodically save data every five seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (saving) return; // Avoid saving if already saving
      saveDataToStorage();
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [data, saving]);

  return (
      <div>
      {saving && <Spinner />}
      <Grid data={data} onCardClick = {handleCardClick} onDragEnd = {handleDragEnd} />
      {lastSaveTime && <p className='align-center'><strong>Last saved: {lastSaveTime} </strong></p>}
      {overlayImage && <ImageViewer imageSrc={overlayImage} onClose={handleCloseOverlay} />}
    </div>
  );
}

export default DocumentCard;
