import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./cart.css"; // Asegúrate de importar los estilos

export const CartItem = (props) => {
    const { id, nombre, precio, img1 } = props.data; // Datos del producto
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext); // Contexto para manejar el carrito

    return  (
        <div className="cartItem">
            <img src={img1} alt={nombre} /> {/* Se muestra la primera imagen del producto */}
            <div className="description">
                <p><b> {nombre} </b></p> {/* Se muestra el nombre del producto */}
                <p>${precio}</p> {/* Se muestra el precio del producto */}
                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}> - </button> {/* Botón para disminuir cantidad */}
                    <input value={cartItems[id]} readOnly /> {/* Muestra la cantidad en el carrito */}
                    <button onClick={() => addToCart(id)}> + </button> {/* Botón para aumentar cantidad */}
                </div>
            </div>
        </div>
    );
};
