import express from "express";
import { bookProduct, buyProducts, getAllProducts, getProduct, createProduct, updateProducts, deleteProduct } from "../controllers/ProductControllers.js";

const router = express.Router();

// Definición de las rutas
router.get('/', getAllProducts);
router.put('/buy', buyProducts);
router.get('/book/:id', bookProduct);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProduct);

export default router;
