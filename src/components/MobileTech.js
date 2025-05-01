import { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';
import './MobileTech.css';

const MobileTech = () => {
  {/* Estado para controlar la visibilidad del formulario */}
  const [showForm, setShowForm] = useState(false);

  return (
    {/* Contenedor principal del componente */}
    <div className="mobile-tech">
      {/* Botón para alternar entre formulario y catálogo */}
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="toggle-form-btn"
      >
        {showForm ? 'Ver Catálogo' : 'Agregar Producto'}
      </button>
      
      {/* Mostrar formulario o lista de productos según el estado */}
      {showForm ? <ProductForm /> : <ProductList />}
    </div>
  );
};

export default MobileTech;