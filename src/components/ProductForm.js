import { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct, onCancel }) => {
  {/* Estado para almacenar los datos del formulario */}
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  {/* Estado para la vista previa de la imagen */}
  const [imagePreview, setImagePreview] = useState('');

  {/* Función para manejar el envío del formulario */}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.category) {
      alert('Nombre, precio y marca son requeridos');
      return;
    }
    onAddProduct(product);
  };

  {/* Función para manejar el cambio de imagen */}
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProduct({...product, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    {/* Formulario principal */}
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Agregar Nuevo Celular</h2>
      
      {/* Grupo de campo para el modelo */}
      <div className="form-group">
        <label>Modelo*</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({...product, name: e.target.value})}
          required
        />
      </div>
      
      {/* Grupo de campo para el precio */}
      <div className="form-group">
        <label>Precio (MXN)*</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({...product, price: e.target.value})}
          min="0"
          step="1"
          required
        />
      </div>
      
      {/* Grupo de campo para la marca */}
      <div className="form-group">
        <label>Marca*</label>
        <input
          type="text"
          value={product.category}
          onChange={(e) => setProduct({...product, category: e.target.value})}
          placeholder="Ej: Samsung, Apple, etc."
          required
        />
      </div>
      
      {/* Grupo de campo para la descripción */}
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          value={product.description}
          onChange={(e) => setProduct({...product, description: e.target.value})}
        />
      </div>
      
      {/* Grupo de campo para la imagen */}
      <div className="form-group">
        <label>Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {/* Vista previa de la imagen */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Vista previa" />
          </div>
        )}
      </div>
      
      {/* Acciones del formulario */}
      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancelar</button>
        <button type="submit">Agregar Producto</button>
      </div>
    </form>
  );
};

export default ProductForm;