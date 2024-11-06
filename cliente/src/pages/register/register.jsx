import React, { useState, useEffect } from "react";
import './register.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const URI = 'http://localhost:3001/users/';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState(''); // Cambiado a "adress"
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const res = await axios.get(URI);
            setUsers(res.data);
        } catch (error) {
            console.error('Error obteniendo los usuarios', error);
        }
    };

    const store = async (e) => {
        e.preventDefault();
        // Verifica si el usuario ya existe
        if (users.find(user => user.user_name === name)) {
            alert('El nombre de usuario ya existe. Por favor, elige otro.');
            return;
        }
        // Inserta el usuario en la base de datos
        try {
            await axios.post(URI, {
                user_name: name,
                password: password,
                adress: adress, // Cambiado a "adress"
                telephone: telephone,
                email: email
            });
            alert('Registro exitoso');
            navigate('/login');
        } catch (error) {
            console.error('Error registrando el usuario', error);
            alert('Error al registrar el usuario. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={store}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="Username"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />
                <input
                    value={adress} // Cambiado a "adress"
                    onChange={(e) => setAdress(e.target.value)}
                    type="text"
                    name="adress" // Cambiado a "adress"
                    id="adress" // Cambiado a "adress"
                    placeholder="Adress" // Cambiado a "adress"
                />
                <input
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    type="text"
                    name="telephone"
                    id="telephone"
                    placeholder="Telephone"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <input type="submit" className="btn-login" value="Register" />
            </form>
        </div>
    );
};

export default Register;
