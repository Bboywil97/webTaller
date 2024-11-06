import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, nombre, precio, descripcion, img1, img2, img3 } = props.data; // Datos del producto
    const { addToCart, cartItems } = useContext(ShopContext); // Contexto para manejar el carrito
    const cartItemAmount = cartItems[id]; // Número de elementos en el carrito

    return (
        <div className="product">
            <div className="slide-var"> {/* Carrusel de imágenes */}
                <ul>
                    <li><img src={img1} alt={nombre} /></li>
                    <li><img src={img2} alt={nombre} /></li>
                    <li><img src={img3} alt={nombre} /></li>
                </ul>
            </div>
            <div className="descripcion">
                <p>{descripcion}</p> {/* Descripción del producto */}
            </div>
            <div className="description">
                <p><b>{nombre}</b></p> {/* Nombre del producto */}
                <p>${precio}</p> {/* Precio del producto */}
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}> {/* Botón "Add To Cart" */}
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>} {/* Cantidad en el carrito */}
            </button>
        </div>
    );
};
