import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import data from "../db/data";
import "./outfit-builder.css";
import { useCart } from "../context/CartContext";

function DraggableItem({ item }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "clothing",
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={dragRef}
      src={item.img}
      alt={item.title}
      className="draggable-img"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />
  );
}

function DropZone({ droppedItems, onDrop, onClear, onBuy }) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "clothing",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="drop-column">
      <div
        ref={dropRef}
        className="drop-zone vertical-stack"
        style={{ backgroundColor: isOver ? "#f0f0f0" : "white" }}
      >
        {droppedItems.map((item, index) => (
          <img
            key={index}
            src={item.img}
            alt={item.title}
            className="outfit-stack-img"
          />
        ))}
      </div>
      <button className="clear-button" onClick={onClear}>
        Clear Canvas
      </button>
      <button className="buy-outfit-button" onClick={onBuy}>
        Buy Outfit
      </button>
    </div>
  );
}

function categorizeItems(items) {
  const groups = {
    Tops: [],
    Bottoms: [],
    Dresses: [],
    Hoodies: [],
    Other: [],
  };

  items.forEach((item) => {
    const cat = item.category.toLowerCase();
    if (["shirts", "tops"].includes(cat)) groups.Tops.push(item);
    else if (["pants", "jeans"].includes(cat)) groups.Bottoms.push(item);
    else if (["dresses"].includes(cat)) groups.Dresses.push(item);
    else if (["hoodies"].includes(cat)) groups.Hoodies.push(item);
    else groups.Other.push(item);
  });

  return groups;
}

export default function OutfitBuilder() {
  const [droppedItems, setDroppedItems] = useState([]);
  const categorized = categorizeItems(data);
  const { addToCart } = useCart();

  const handleDrop = (item) => {
    setDroppedItems((prev) => [...prev, item]);
  };

  const handleClear = () => {
    setDroppedItems([]);
  };

  const handleBuyOutfit = () => {
    if (droppedItems.length === 0) {
      alert("Add some items to the outfit first!");
      return;
    }

    droppedItems.forEach((item) => {
      const size = "M"; // default size
      addToCart(item, size);
    });

    alert("🛒 Outfit added to your cart!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="builder-wrapper">
        <div className="clothing-column">
          <h2>Pick Your Items</h2>
          {Object.entries(categorized).map(([category, items]) => (
            <div key={category} className="category-section">
              <h3 className="category-title">{category}</h3>
              <div className="clothing-panel">
                {items.map((item, index) => (
                  <DraggableItem key={index} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <DropZone
          droppedItems={droppedItems}
          onDrop={handleDrop}
          onClear={handleClear}
          onBuy={handleBuyOutfit}
        />
      </div>
    </DndProvider>
  );
}