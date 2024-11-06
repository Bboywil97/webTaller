import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './productAddtoCart';
import './shopAddtoCart.css';

const URI = 'http://localhost:3001/productos/'; // Aquí se hacen las peticiones

export const ShopAddtoCart = () => {
    const [products, setProducts] = useState([]); // Aquí se guardan todos los productos

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            console.log('Productos obtenidos:', res.data); // Para verificar la respuesta
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>MarketManga</h1>
            </div>
            <div className="products">
                {Array.isArray(products) && products.map((product) => (
                    <Product data={product} key={product.id} /> // Añade una clave única para cada producto
                ))}
            </div>
        </div>
    );
};
