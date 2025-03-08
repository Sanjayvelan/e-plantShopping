import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    if (!Array.isArray(cart) || cart.length === 0) return "0.00"; // Handle empty cart

    console.log("Cart:", cart);
    cart.forEach(item => {
        console.log("Item:", item);
        console.log("Cost before parse:", item?.cost);
        console.log("Cost after parse:", parseFloat(item?.cost?.replace('$', '')));
        console.log("Quantity:", item?.quantity);
    });


    return cart.reduce((total, item) => {
        // Ensure item and its properties are valid
        if (!item || !item.cost || isNaN(item.quantity)) return total;

        // Convert cost to a number safely
        const itemCost = parseFloat(item.cost.replace('$', ''));

        // Ensure itemCost is a valid number
        if (isNaN(itemCost)) return total;

        return total + item.quantity * itemCost;
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
        dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
     return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
        <div>
            {cart.map(item => (
            <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
            </div>
            ))}
        </div>
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
        <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
            <br />
            <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
        </div>
    </div>
 );
};

export default CartItem;


