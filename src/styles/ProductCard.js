import React, { useState } from 'react';
import './styles/ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  {/* Estado para controlar el hover sobre la tarjeta */}
  const [isHovered, setIsHovered] = useState(false);

  return (
    {/* Contenedor principal de la tarjeta */}
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de la imagen del producto */}
      <div className="product-image">
        {/* Imagen del producto con valor por defecto */}
        <img 
          src={product.image || 'https://via.placeholder.com/300x200?text=Sin+imagen'} 
          alt={product.name} 
        />
        
        {/* Botón de eliminar que solo aparece en hover */}
        {isHovered && (
          <button 
            className="delete-btn"
            onClick={() => onDelete(product.id)}
          >
            Eliminar
          </button>
        )}
      </div>
      
      {/* Contenedor de la información del producto */}
      <div className="product-info">
        {/* Nombre/título del producto */}
        <h3 className="product-title">{product.name}</h3>
        
        {/* Precio del producto formateado */}
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        {/* Categoría del producto */}
        <div className="product-category">{product.category}</div>
        
        {/* Descripción condicional del producto */}
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        
        {/* Botón para ver detalles */}
        <button className="add-to-cart-btn">Ver Detalles</button>
      </div>
    </div>
  );
};

export default ProductCard;