import React from 'react';

const Card = ({ title, thumbnailSrc, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <p>{title}</p>
      <img src={thumbnailSrc} alt={title} height="200px" width="200px" />
    </div>
  );
};

export default Card;
