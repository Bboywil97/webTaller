import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

const URI = 'http://localhost:3001/productos/';

export const ProductForm = ({ onProductAdded }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                nombre,
                precio,
                descripcion,
                img1,
                img2,
                img3
            };
            console.log('Datos del producto enviados:', productData);
            const res = await axios.post(URI, productData);
            console.log('Respuesta del servidor:', res.data);
            alert('Producto agregado exitosamente');
            onProductAdded(); 
            setNombre('');
            setPrecio('');
            setDescripcion('');
            setImg1('');
            setImg2('');
            setImg3('');
        } catch (error) {
            console.error('Error agregando el producto', error);
            alert('Hubo un error al agregar el producto.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Agregar Nuevo Producto</h2>
            <div className="form-group">
                <label htmlFor="nombre">Nombre del Producto:</label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Precio"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="img1">URL de la Imagen 1:</label>
                <input
                    type="text"
                    id="img1"
                    value={img1}
                    onChange={(e) => setImg1(e.target.value)}
                    placeholder="URL de la imagen 1"
                />
            </div>
            <div className="form-group">
                <label htmlFor="img2">URL de la Imagen 2:</label>
                <input
                    type="text"
                    id="img2"
                    value={img2}
                    onChange={(e) => setImg2(e.target.value)}
                    placeholder="URL de la imagen 2"
                />
            </div>
            <div className="form-group">
                <label htmlFor="img3">URL de la Imagen 3:</label>
                <input
                    type="text"
                    id="img3"
                    value={img3}
                    onChange={(e) => setImg3(e.target.value)}
                    placeholder="URL de la imagen 3"
                />
            </div>
            <button type="submit" className="submit-btn">Agregar Producto</button>
        </form>
    );
};
