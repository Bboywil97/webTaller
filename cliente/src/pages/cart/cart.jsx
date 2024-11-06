import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item';
import "./cart.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:3001/productos/';

export const Cart = () => {
    const context = useContext(ShopContext);
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            console.log('Productos obtenidos:', res.data);
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const buy = async (e) => {
        e.preventDefault();
        console.log('Elementos del carrito:', cartItems);
        try {
            await axios.put(URI + 'buy', cartItems);
            context.setPayAumount(totalAmount);
            navigate('/stripe');
        } catch (error) {
            alert('Error durante la compra: ' + error.message);
        }
    };

    return (
        <div className="cart-container">
            <div>
                <h1> Tu carrito </h1>
            </div>
            <div className="cartItems">
                {Array.isArray(products) && products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} key={product.id} />;
                    }
                    return null;
                })}
            </div>
            {totalAmount > 0 ? (
                <div className="checkout">
                    <p> Subtotal: ${totalAmount}</p>
                    <button onClick={() => navigate("/shop")}> Continue Shopping</button>
                    <button onClick={buy}> Checkout </button>
                </div>
            ) : (
                <h1> Tu carrito está vacío </h1>
            )}
        </div>
    );
};

