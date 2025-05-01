import './ProductList.css';

const ProductList = ({ 
  products, 
  selectedProduct, 
  onSelectProduct, 
  onDeleteProduct,
  expandedProduct,
  onToggleExpand
}) => {
  return (
    {/* Lista contenedora de nombres de productos */}
    <ul className="product-name-list">
      {/* Mapeo de cada producto en la lista */}
      {products.map(product => (
        {/* Elemento de lista para cada producto */}
        <li 
          key={product.id}
          {/* Clase condicional para el producto seleccionado */}
          className={`product-name-item ${selectedProduct?.id === product.id ? 'selected' : ''}`}
        >
          {/* Span clickable para seleccionar el producto */}
          <span onClick={() => onSelectProduct(product)}>
            {product.name}
          </span>
          
          {/* Botón para eliminar producto */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProduct(product.id);
            }}
            className="delete-product-btn"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;