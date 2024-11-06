import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const ProductModel = db.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    img1: { type: DataTypes.TEXT, allowNull: false },
    img2: { type: DataTypes.TEXT, allowNull: false },
    img3: { type: DataTypes.TEXT, allowNull: false },
    stockMax: { type: DataTypes.INTEGER, allowNull: false },
    stockMin: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false
});

export default ProductModel;
