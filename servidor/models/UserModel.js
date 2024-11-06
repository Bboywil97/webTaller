import db from "../database/db.js"; 
import { DataTypes } from "sequelize";

// Definición del modelo de usuario
const UserModel = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.STRING, allowNull: false },  // Verifica que este es el nombre correcto en tu base de datos
    telephone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false // Desactiva timestamps si no los necesitas
});

export default UserModel;
