import express from 'express';
import UserModel from '../models/UserModel.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

router.get('/:id', async (req, res) => {
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
});

router.post('/', async (req, res) => {
    try {
        const { user_name, password, adress, telephone, email } = req.body;
        console.log('Datos recibidos:', req.body); // Agrega esto para depuración
                
        const newUser = await UserModel.create({
            user_name,
            password,
            adress,
            telephone,
            email
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registrando el usuario:", error);
        res.status(400).json({ error: 'Error registrando el usuario', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { user_name, password, adress, telephone, email } = req.body;
        const user = await UserModel.findByPk(req.params.id);
        if (user) {
            user.user_name = user_name;
            user.password = password;
            user.adress = adress;
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
});

export default router;
