import { Router } from 'express';
import fs from 'fs';

const router = Router();
let carts = [];

const loadCarts = ()=> {
    if (fs.existsSync('carts.json')) {
        carts = JSON.parse(fs.readFileSync('carts.json'));
    }
};

const saveCarts = ()=> {
    fs.writeFileSync('carts,json', JSON.stringify(carts, null, 2))
}

router.get('/:cid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    res.json(cart || {});
});

router.post('/', (req, res) => {
    const newCart = {
        id: carts.length + 1,
        products: []
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;
        const existingProduct = cart.products.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

loadCarts();

export default router;