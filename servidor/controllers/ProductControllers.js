import ProductModel from '../models/ProductModel.js';


// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Crear un nuevo producto


// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, img1, img2, img3 } = req.body;
        const newProduct = await ProductModel.create({ nombre, precio, descripcion, img1, img2, img3 });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(400).json({ error: 'Error al crear el producto', details: error.message });
    }
};

// Otros controladores...


// Actualizar un producto

// Actualizar un producto
export const updateProducts = async (req, res) => {
    try {
        const { precio, stockMax, stockMin, img1, img2, img3 } = req.body;
        const product = await ProductModel.findByPk(req.params.id);
        if (product) {
            await product.update({
                precio,
                stockMax,
                stockMin,
                img1,
                img2,
                img3
            });
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(400).json({ error: 'Error al actualizar el producto', details: error.message });
    }
};



// Eliminar un producto


// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByPk(id);
        if (product) {
            await product.destroy();
            res.status(200).json({ message: 'Producto eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto', details: error.message });
    }
};


// Funciones adicionales como bookProduct y buyProducts deben estar aquí
export const bookProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const action = req.query.f;

        const product = await ProductModel.findByPk(id);
        if (!product) {
            return res.status(404).json('Producto no encontrado');
        }

        if (action === 'book') {
            // Lógica para reservar el producto
            if (product.stockMax > 0) {
                product.stockMax -= 1;
                await product.save();
                return res.json('Booked');
            } else {
                return res.json('Stockout');
            }
        } else if (action === 'unbook') {
            // Lógica para liberar la reserva del producto
            product.stockMax += 1;
            await product.save();
            return res.json('Unbooked');
        } else {
            return res.status(400).json('Acción no válida');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json('Error al procesar la solicitud');
    }
};

export const buyProducts = async (req, res) => {
    // Implementación de buyProducts
};
