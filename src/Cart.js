import React from 'react';
import { useCart } from './CartContext'; // Import the useCart hook
import Modal from './Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartContext = useCart(); // Access the cart context using the hook
 

  const CartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.cartItems.map((item) => (
        <li key={item.id}> {item.name} - {item.size} - {item.qty}</li>
      ))}
    </ul>
  );

  const totalAmount = cartContext.cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  return (
    <Modal onclose={props.onclose}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onclose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
