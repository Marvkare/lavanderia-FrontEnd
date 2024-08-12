import React from 'react';
import {useState } from 'react'
import { useForm,  } from 'react-hook-form';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiServerLavanderia } from './../../config';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
      console.log("se agrego cabecera")
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(ApiServerLavanderia+"api/usuario/login", data);
      const token = response.data.token;
      const usuarioData = response.data.usuarioData
      // Almacenar el token en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuarioData',usuarioData)
      // Configurar interceptor de axios
      
      // Navegar a la ruta /main
      navigate('/paginaprincipal');
    } catch (error) {
        setErrorMessage(error.response?.data?.mensaje || 'Error logging in');
      console.error('Error logging in', error);
      // Manejar el error de inicio de sesión (mostrar mensaje de error, etc.)
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
            {...register('NombreUsuario', { 
              required: 'Es nesesario el nombre de usuario',
              /*pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Enter a valid email address'
              }*/
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('Contrasena', { 
              required: 'Ingrese su contraseña',
              minLength: {
                value: 6,
                message: 'Minimo 6 caracteres'
              }
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && errors.password.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
    </Container>
  );
};

export default LoginForm;
