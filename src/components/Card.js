import React from 'react';

const Card = ({ title, thumbnail, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <p>{title}</p>
      <img src={thumbnail} alt={title} />
     
    </div>
  );
};

export default Card;
