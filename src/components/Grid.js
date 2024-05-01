import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';

const Grid = ({ data, onCardClick, onDragEnd }) => {

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                    <Card
                      title={item.title}
                      thumbnailSrc={item.thumbnail}
                      onClick={() => onCardClick(item.thumbnail)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Grid;
