import React, { useState } from "react";
import "./Card.css";
import { useCart } from "./CartContext";

const Card = (props) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState(props.sizes); // Use sizes state here
  const cartContext = useCart();

  const addToCartHandler = () => {
    if (selectedSize) {
      const selectedSizeObj = sizes.find((size) => size.size === selectedSize);

      if (selectedSizeObj) {
        const updatedSizes = sizes.map((size) =>
          size.size === selectedSize
            ? { ...size, qty: size.qty - 1 }
            : size
        );

        const selectedItem = {
          id: props.name.replace(/\s+/g, "-").toLowerCase(),
          name: props.name,
          price: props.price,
        };

        cartContext.addItemToCart(selectedItem, selectedSize);
        setSelectedSize(null);
        setSizes(updatedSizes); // Update the sizes array in the state
      }
    }
  };

  return (
    <div className={`card ${selectedSize ? `size-${selectedSize}` : ""}`}>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <div className="size-options">
        <p>Sizes:</p>
        {sizes.map((size, index) => (
          <label key={index}>
            <input
              type="radio"
              name="size"
              value={size.size}
              checked={selectedSize === size.size}
              onChange={() => setSelectedSize(size.size)}
            />
            {size.size} ({size.qty})
          </label>
        ))}
      </div>
      <p>Price: ${props.price.toFixed(2)}</p>
      <button className="card-btn" onClick={addToCartHandler}>
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
