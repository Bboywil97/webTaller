import React, { useState } from 'react';
import axios from 'axios';
import './editProduct.css'; // Importa el CSS específico para EditProduct

const URI = 'http://localhost:3001/productos/';

export const Product = (props) => {
    const { id, nombre, precio, img1, img2, img3, stockMax, stockMin } = props.data;
    const [priceHook, setPrice] = useState(precio || '');
    const [maxStock, setMaxS] = useState(stockMax || '');
    const [minStock, setMinS] = useState(stockMin || '');
    const [image1, setImage1] = useState(img1 || '');
    const [image2, setImage2] = useState(img2 || '');
    const [image3, setImage3] = useState(img3 || '');

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI}${id}/`, { precio: priceHook, stockMax: maxStock, stockMin: minStock, img1: image1, img2: image2, img3: image3 });
            alert('Producto actualizado con éxito');
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert('Hubo un problema al actualizar el producto');
        }
    };

    const deleteProduct = async () => {
        try {
            await axios.delete(`${URI}${id}`);
            alert('Producto eliminado con éxito');
            window.location.reload(); // Actualiza la página después de eliminar el producto
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert('Hubo un problema al eliminar el producto');
        }
    };

    return (
        <div className="product">
            <div className="slide-var">
                <ul>
                    <li><img src={image1} alt={nombre} /></li>
                    <li><img src={image2} alt={nombre} /></li>
                    <li><img src={image3} alt={nombre} /></li>
                </ul>
            </div>
            <div className="description">
                <p><b>{nombre}</b></p>
                <p className="price">${precio}</p>
                <p>Max Stock: {stockMax}</p>
                <p>Min Stock: {stockMin}</p>
                <form onSubmit={update}>
                    <input
                        value={priceHook}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="New Price"
                    />
                    <input
                        value={maxStock}
                        onChange={(e) => setMaxS(e.target.value)}
                        type="number"
                        placeholder="New MaxStock"
                    />
                    <input
                        value={minStock}
                        onChange={(e) => setMinS(e.target.value)}
                        type="number"
                        placeholder="New MinStock"
                    />
                    <input
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        type="text"
                        placeholder="New Image 1 URL"
                    />
                    <input
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        type="text"
                        placeholder="New Image 2 URL"
                    />
                    <input
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        type="text"
                        placeholder="New Image 3 URL"
                    />
                    <button type="submit" className="btn-login">Edit</button>
                </form>
                <button onClick={deleteProduct} className="delete-btn">Delete</button>
            </div>
        </div>
    );
};
