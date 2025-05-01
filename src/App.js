import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);

  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);

  // Estado para el producto seleccionado actualmente
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estado para controlar qué producto está expandido
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Efecto para cargar productos al iniciar la aplicación
  useEffect(() => {
    const savedProducts = localStorage.getItem('techmobile-products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
      if (parsedProducts.length > 0) {
        setSelectedProduct(parsedProducts[0]);
      }
    }
  }, []);

  // Efecto para guardar productos cuando cambian
  useEffect(() => {
    localStorage.setItem('techmobile-products', JSON.stringify(products));
  }, [products]);

  // Función para agregar nuevo producto
  const handleAddProduct = (newProduct) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: Number(newProduct.price),
      image: newProduct.image || 'https://via.placeholder.com/300?text=Sin+imagen'
    };
    
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    setSelectedProduct(productToAdd);
    setShowForm(false);
    return true;
  };

  // Función para eliminar producto
  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      
      if (selectedProduct?.id === id) {
        setSelectedProduct(updatedProducts.length > 0 ? updatedProducts[0] : null);
      }
    }
  };

  // Función para alternar la vista expandida
  const toggleExpand = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="app-container">
      {/* Encabezado con gradiente y slogan */}
      <header className="app-header">
        <h1>Bienvenido a TechMobile</h1>
        <p className="tagline">"Innovación y tecnología en tus manos"</p>
      </header>

      <main className="main-content">
        {/* Sidebar con lista de productos y formulario */}
        <aside className="sidebar">
          {/* Botón para mostrar/ocultar formulario */}
          <button 
            onClick={() => setShowForm(!showForm)}
            className="add-product-btn"
          >
            {showForm ? 'Cancelar' : '➕ Agregar Celular'}
          </button>
          
          {/* Formulario condicional */}
          {showForm && (
            <div className="form-container">
              <ProductForm onAddProduct={handleAddProduct} />
            </div>
          )}
          
          {/* Lista de nombres de productos */}
          <div className="product-names-container">
            <ProductList 
              products={products}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
              onDeleteProduct={handleDeleteProduct}
              expandedProduct={expandedProduct}
              onToggleExpand={toggleExpand}
            />
          </div>
        </aside>

        {/* Área principal de visualización */}
        <div className="product-display">
          {selectedProduct ? (
            <div className="product-details-container">
              {/* Vista previa de imagen con tamaño condicional */}
              <div className={`product-image-preview ${expandedProduct === selectedProduct.id ? 'expanded' : ''}`}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300?text=Imagen+no+disponible';
                  }}
                />
              </div>
              
              {/* Nombre del producto */}
              <h2>{selectedProduct.name}</h2>
              
              {/* Botón para expandir/contraer detalles */}
              <button 
                onClick={() => toggleExpand(selectedProduct.id)}
                className="read-more-btn"
              >
                {expandedProduct === selectedProduct.id ? 'Leer menos' : 'Leer más'}
              </button>
              
              {/* Detalles del producto (condicionales) */}
              {expandedProduct === selectedProduct.id && (
                <div className="product-specs">
                  <p><strong>Marca:</strong> {selectedProduct.category}</p>
                  <p><strong>Precio:</strong> ${selectedProduct.price.toLocaleString()}</p>
                  <p><strong>Especificaciones:</strong> {selectedProduct.description}</p>
                </div>
              )}
            </div>
          ) : (
            // Mensaje cuando no hay producto seleccionado
            <p className="no-products-message">Selecciona un producto para ver detalles</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
