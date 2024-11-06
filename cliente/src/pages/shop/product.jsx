import React, { useState } from 'react';
import './shop.css'; // Importa el CSS específico para Shop

export const Product = (props) => {
    const { nombre, precio, img1, img2, img3 } = props.data;
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [img1, img2, img3];

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    };

    const nextSlide = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <div className="product">
            <div className="carousel">
                <div className="carousel-inner" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {images.map((img, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={img} alt={nombre} />
                        </div>
                    ))}
                </div>
                <div className="carousel-controls">
                    <button className="carousel-control" onClick={prevSlide}>‹</button>
                    <button className="carousel-control" onClick={nextSlide}>›</button>
                </div>
            </div>
            <div className="description">
                <p><b>{nombre}</b></p>
                <p className="price">${precio}</p>
                <button className="addToCartBttn">Agregar al Carrito</button>
            </div>
        </div>
    );
};
