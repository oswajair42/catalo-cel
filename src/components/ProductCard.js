import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  return (
    {/* Contenedor principal de la tarjeta de producto */}
    <div className="product-card">
      {/* Nombre del producto */}
      <h2>{product.name}</h2>
      
      {/* Imagen del producto */}
      <img 
        src={product.image} 
        alt={product.name} 
        {/* Se podría añadir una imagen por defecto si product.image está vacío */}
      />
      
      {/* Detalles del producto */}
      <div className="product-details">
        {/* Marca/Categoría del producto */}
        <p><strong>Marca:</strong> {product.category}</p>
        
        {/* Precio del producto */}
        <p><strong>Precio:</strong> ${product.price}</p>
        
        {/* Descripción del producto */}
        <p><strong>Descripción:</strong> {product.description}</p>
      </div>
      
      {/* Botón para eliminar el producto */}
      <button 
        onClick={() => onDelete(product.id)} 
        className="delete-btn"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ProductCard;