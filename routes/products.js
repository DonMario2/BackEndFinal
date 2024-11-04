import { Router } from 'express';
import fs from 'fs';

const router = Router()
let products = [];

const loadProducts = () => {
    if (fs.existsSync('products.json')) {
        products = JSON.parse(fs.readFileSync('products.json'));
    }
};

const saveProducts = () => {
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
};

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || products.length;
    res.json(products.slice(0, limit));
});

router.get('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    res.json(product || {});
});

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails = [] } = req.body;
    const newProduct = {
        id: products.length + 1, 
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
        Object.assign(product, req.body);
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.delete('/:pid', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.pid));
    res.status(204).send();
});

loadProducts();
export default router
}router.post('/', (req, res) => {
    // ...existing code...
    io.emit('product update', products);
  });
  
  router.delete('/:pid', (req, res) => {
    // ...existing code...
    io.emit('product update', products);
  });