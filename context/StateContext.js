import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, qty) => {
        //Check if item is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + qty);

        //if product is already in the cart --> just increase quantity; Don't create new instance
        if(checkProductInCart){
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + qty);

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + qty
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = qty;
            setCartItems([...cartItems, { ...product }]);
        }

        //Display Success Message
        toast.success(`${quantity} ${product.name} added to the cart.`)
    }

    const removeCartItem = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        let foundProductTotalAmount = foundProduct.price * foundProduct.quantity;
        
        //Filter for all items except the one we are updating
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProductTotalAmount);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    //TO DO: FIX THE ORDERING BUG IN THE CART
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        //Filter for all items except the one we are updating
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc'){
            //Create a new array and add the product with an updated quanity
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
        } else if(value === 'dec') {
            if(foundProduct.quantity > 1){
                //Create a new array and add the product with an updated quanity
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);

                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
            }
        }
    }

    const increaseQuantity = () => {
        setQuantity((prevQty) => prevQty + 1)
    }

    const decreaseQuantity = () => {
        setQuantity((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            
            return prevQty - 1;
        })
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            quantity,
            increaseQuantity,
            decreaseQuantity,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            removeCartItem
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);