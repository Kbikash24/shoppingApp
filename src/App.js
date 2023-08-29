import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import Data from './Data';
import Cart from './Cart';
import { useCart } from './CartContext'; // Import the useCart hook

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cartContext = useCart(); // Access the cart context using the hook

  // Calculate the total quantity of items in the cart
  const totalCartItems = cartContext.cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      <nav className='nav'>
        <div>Clothing Brand</div>
        <button className='cart-button' onClick={showCartHandler}>
          Cart <span className='qty'>{totalCartItems}</span>
        </button>
      </nav>
      {cartIsShown && <Cart onclose={hideCartHandler} />}
      <div className='container'>
        {Data.map((val, index) => (
          <Card
            key={index}
            name={val.name}
            description={val.description}
            sizes={val.sizes}
            qty={val.qty}
            price={val.price}
          />
        ))}
      </div>
    </>
  );
}

export default App;
