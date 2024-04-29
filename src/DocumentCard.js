import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
    console.log("handleCardClick", imageSrc)
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
  }, [data, saving, saveDataToStorage]);

  return (
      <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="document-cards-container">
              {data.map((item, index) => (
                <Draggable key={item.type} draggableId={item.type} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="card" onClick={() => handleCardClick(item.thumbnail)}>
                        <img src={item.thumbnail} alt={item.title} height="200px" width="200px" />
                        <p>{item.title}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {overlayImage && <ImageViewer imageSrc={overlayImage} onClose={handleCloseOverlay} />}
      {saving && <Spinner />}
      {lastSaveTime && <p><strong>Last saved: {lastSaveTime} </strong></p>}
    </div>
  );
}

export default DocumentCard;
