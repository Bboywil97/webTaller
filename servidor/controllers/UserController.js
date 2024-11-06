import UserModel from '../models/UserModel.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un solo usuario por ID
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { user_name, password, address, telephone, email } = req.body;
        const newUser = await UserModel.create({
            user_name,
            password,
            address,
            telephone,
            email
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario', details: error.message });
    }
};

// Actualizar un usuario existente
export const updateUser = async (req, res) => {
    try {
        const { user_name, password, address, telephone, email } = req.body;
        const user = await UserModel.findByPk(req.params.id);
        if (user) {
            user.user_name = user_name;
            user.password = password;
            user.address = address;
            user.telephone = telephone;
            user.email = email;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el usuario', details: error.message });
    }
};
