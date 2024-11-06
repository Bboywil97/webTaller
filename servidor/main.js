import Express from 'express';
import cors from 'cors';
import db from './database/db.js';
import productRoutes from './routes/routesProducts.js';
import userRoutes from './routes/routesUser.js';
import { pay } from './routes/pay.js';
import ProductModel from './models/ProductModel.js'; // Importa ProductModel

const app = Express();

app.use(cors());
app.use(Express.json());
app.use('/productos', productRoutes); // Asegúrate de que esta línea está correcta
app.use('/users', userRoutes);
app.use('/payment', pay);

try {
    db.authenticate();
    console.log('Conexión exitosa a la BD');
} catch (error) {
    console.log(`El error de conexión fue: ${error}`);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Sincroniza el modelo con la base de datos
const syncDatabase = async () => {
    try {
        await ProductModel.sync({ alter: true });
        console.log("La tabla 'productos' ha sido sincronizada.");
    } catch (error) {
        console.error("Error al sincronizar la tabla 'productos':", error);
    }
};

syncDatabase();



// Variable para exportar
let productsStock = {};
let productMinStock = {};

// Función asíncrona para obtener productos
const fetchProducts = async () => {
    try {
        const products = await ProductModel.findAll({
            attributes: ['id', 'stock', 'stockMin', 'nombre']
        });

        products.forEach(product => {
            productsStock[product.dataValues.id] = product.dataValues.stock;
        });

        products.forEach(product => {
            productMinStock[product.dataValues.id] = {
                stockMin: product.dataValues.stockMin,
                nombre: product.dataValues.nombre
            };
        });

        console.log(productMinStock);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

// Llamada a la función
fetchProducts();

export { productsStock, productMinStock };

