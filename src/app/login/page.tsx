'use client';

import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { loginUser } from '../services/api';
// import Image from 'next/image'; // opcional si usas `next/image`
import styles from '..Login.module.css'; // Usa módulos CSS


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

 const handleLogin = async () => {
  console.log('Inicio de sesión:', { email, password });
  setError('');
  const userData = { username: email, password };

  try {
    const response = await loginUser(userData); // <- llamada a tu servicio
    console.log('Login exitoso:', response);

    // Redirige al dashboard o pantalla deseada
    router.push('/project_registration_natural');
  } catch (err: any) {
    console.error('Error de login:', err);
    // Si `err` es un objeto con mensajes específicos
    if (typeof err === 'object' && err.non_field_errors) {
      setError(err.non_field_errors[0]);
    } else if (typeof err === 'string') {
      setError(err);
    } else {
      setError('Error al iniciar sesión');
    }
  }
};
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          sx={{
            padding: 4,
            borderRadius: 4,
            maxWidth: 500,
            width: '100%',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: 3,
              color: '#007bff',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Iniciar Sesión
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <TextField
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              onClick={handleLogin}
              sx={{
                backgroundColor: '#00aaff',
                color: 'black',
                borderRadius: 50,
                padding: '10px 20px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                border: '2px solid #00aaff',
                '&:hover': {
                  backgroundColor: '#0099dd',
                },
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
        </Paper>
      </Container>

      <Box
        sx={{
          backgroundImage: `url('/images/Mensaje-Registro.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Box>
  );
}
