import React from 'react';

const ImageViewer = ({ imageSrc, onClose }) => {
  return (
      <div className="image-overlay" onClick={onClose}>
      <div>
        <div className="overlay">
        <img src={imageSrc} alt="Overlay" />
        </div>
      </div>
    </div>

  );
};

export default ImageViewer;
