import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import './Home.css';

const Home = () => {
  {/* Estado para almacenar la lista de productos */}
  const [products, setProducts] = useState([]);

  {/* Estado para manejar el estado de carga */}
  const [loading, setLoading] = useState(true);

  {/* Estado para manejar errores */}
  const [error, setError] = useState('');

  {/* Función para obtener los productos desde la API */}
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
    } catch (err) {
      setError('Error cargando los celulares');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  {/* Efecto para cargar productos al montar el componente */}
  useEffect(() => {
    fetchProducts();
  }, []);

  {/* Función para agregar un nuevo producto */}
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    {/* Contenedor principal */}
    <div className="home-container">
      {/* Título principal */}
      <h1 className="main-title">
        <i className="icon-phone"></i> Catálogo de Celulares
      </h1>
      
      {/* Mensaje de error condicional */}
      {error && (
        <div className="error-message">
          <i className="icon-warning"></i> {error}
        </div>
      )}

      {/* Contenido principal */}
      <div className="content">
        {/* Componente del formulario */}
        <ProductForm onAddProduct={handleAddProduct} />
        
        {/* Componente de lista de productos */}
        <ProductList 
          products={products} 
          refreshProducts={fetchProducts}
        />
      </div>
    </div>
  );
};

export default Home;