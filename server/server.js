const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'products.json');

// Crear directorio y archivo si no existen
if (!fs.existsSync(path.dirname(dataPath))) {
  fs.mkdirSync(path.dirname(dataPath));
}
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

// Leer productos del archivo
const readProducts = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (error) {
    console.error("Error leyendo productos:", error);
    return [];
  }
};

// Guardar productos en archivo
const saveProducts = (products) => {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

// Datos iniciales (4 productos como mínimo)
const initializeProducts = () => {
  const initialProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 24999,
      category: "Apple",
      description: "Pantalla Super Retina XDR de 6.1\", chip A17 Pro, 128GB almacenamiento, cámara triple de 48MP",
      image: "https://i.imgur.com/iphone15.jpg"
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      price: 22999,
      category: "Samsung",
      description: "Pantalla Dynamic AMOLED 2X de 6.8\", Snapdragon 8 Gen 2, 256GB, cámara de 200MP",
      image: "https://i.imgur.com/s23ultra.jpg"
    },
    {
      id: 3,
      name: "Xiaomi 13 Pro",
      price: 17999,
      category: "Xiaomi",
      description: "Pantalla AMOLED de 6.73\", Snapdragon 8 Gen 2, 256GB, cámara triple de 50MP",
      image: "https://i.imgur.com/xiaomi13.jpg"
    },
    {
      id: 4,
      name: "Motorola Edge 40",
      price: 12999,
      category: "Motorola",
      description: "Pantalla pOLED de 6.55\", MediaTek Dimensity 8020, 256GB, cámara dual de 50MP",
      image: "https://i.imgur.com/motoedge40.jpg"
    }
  ];

  if (readProducts().length === 0) {
    saveProducts(initialProducts);
  }
};

// Inicializar productos al iniciar
initializeProducts();

// Endpoints
app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

app.post('/api/products', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: Date.now(), // ID único basado en timestamp
    ...req.body,
    price: parseFloat(req.body.price)
  };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  let products = readProducts();
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🛒 Backend de catálogo corriendo en http://localhost:${PORT}`);
});