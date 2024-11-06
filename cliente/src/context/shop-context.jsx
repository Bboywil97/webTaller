import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);
const URI = 'http://localhost:3001/productos/';

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < 12; i++) {
        cart[i] = 0;
    }
    return cart;
};

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [payAumount, setPayAumount] = useState(0);
    const [products, setProducts] = useState([]);
    const [logged, setLogged] = useState(0);
    const [admin, setAdmin] = useState(false);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const loggedChanger = (value) => setLogged(value);
    const AdminChanger = (value) => setAdmin(value);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.precio;
                }
            }
        }
        return totalAmount;
    };

    const addToCart = async (itemId) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/productos/book/${itemId}?f=book`);
            if (data === 'Booked') {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] + 1,
                }));
            } else if (data === 'Stockout') {
                alert('Producto fuera de stock');
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/productos/book/${itemId}?f=unbook`);
            if (data === 'Unbooked') {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] - 1,
                }));
            }
        } catch (error) {
            console.error("Error al remover del carrito:", error);
        }
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        loggedChanger,
        logged,
        AdminChanger,
        admin,
        payAumount,
        setPayAumount,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

