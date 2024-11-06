import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './product';
import './shop.css'; // Importa el CSS específico para Shop

const URI = 'http://localhost:3001/productos/';

export const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            console.log(res.data);
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>MarketManga</h1>
            </div>
            <div className="products">
                {products.map((product) => (
                    <Product data={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};
