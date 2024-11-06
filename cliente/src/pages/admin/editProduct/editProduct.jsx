import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './Product';
import { ProductForm } from './ProductForm';
import './editProduct.css'; // Importa el CSS específico para EditProduct

const URI = 'http://localhost:3001/productos/';

export const EditProduct = () => {
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
            setProducts([]);
        }
    };

    const handleProductAdded = () => {
        getProducts(); // Recarga la lista de productos cuando se inserta uno nuevo
    };

    return (
        <div className="edit-product">
            <div className="shopTitle">
                <h1>Editar Productos</h1>
            </div>
            <ProductForm onProductAdded={handleProductAdded} />
            <div className="productos">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product data={product} key={product.id} />
                    ))
                ) : (
                    <p>No hay productos para mostrar.</p>
                )}
            </div>
        </div>
    );
};


