import { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct, onCancel }) => {
  // Estado para almacenar los datos del formulario
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  // Estado para la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState('');

  // Validación de campos requeridos
  const validateForm = () => {
    return product.name && product.price && product.category;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Por favor complete los campos requeridos: Nombre, Precio y Marca');
      return;
    }
    onAddProduct(product);
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.match('image.*')) {
      alert('Por favor seleccione un archivo de imagen válido');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProduct(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Agregar Nuevo Celular</h2>
      
      <div className="form-group">
        <label htmlFor="name">Modelo*</label>
        <input
          id="name"
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Ej: iPhone 13"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="price">Precio (MXN)*</label>
        <input
          id="price"
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          min="0"
          step="1"
          placeholder="Ej: 15999"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Marca*</label>
        <input
          id="category"
          type="text"
          name="category"
          value={product.category}
          onChange={handleInputChange}
          placeholder="Ej: Samsung, Apple, etc."
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Características del producto"
          rows="4"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="image">Imagen</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Vista previa" />
          </div>
        )}
      </div>
      
      <div className="form-actions">
        <button 
          type="button" 
          onClick={onCancel}
          className="cancel-btn"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={!validateForm()}
          className="submit-btn"
        >
          Agregar Producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
