'use client';

import styles from '../../styles/Globals.module.css'; // Usa módulos CSS
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Modal } from '@mui/material';
import { useRouter } from 'next/navigation';
import { validateCode } from '../services/api';
 
export interface ValidateCodeData {
  username: string;
  codeverification: string;
}
export default function ValidationCode() {

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleValidation = async () => {
    setEmail(localStorage.getItem('userEmail') || '') // Obtener el email del localStorage
    setError('');
    const userData: ValidateCodeData = {
      username: localStorage.getItem('userEmail') || '', // Obtener el email del localStorage 
      codeverification: code, 
    };

    try {
      const response = await validateCode(userData);
      console.log('Respuesta de la API:', response); // Verifica la respuesta de la API
      if (response.message) {
        setOpenModal(true);
      } else {
        setError(response.error)
      }
    } catch (err) {
      setError(err.error);
    }
  };
 
  return (
    <Container maxWidth="sm" style={{ marginTop: '150px', textAlign: 'center' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '16px' }}>
        
        <Typography variant="h5" sx={{ mb: 3, color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>
          Validar Código
        </Typography>

        {error && <Typography color="error">{error}</Typography>} {/* Muestra el error */}
        <TextField 
         size="small"
          label="Ingrese el código"
          variant="outlined" 
          margin="normal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Box display="flex" justifyContent="flex-end" marginTop={2}>    
          <Button variant="contained"  className={styles.btn}   onClick={handleValidation}
            sx={{
              color: '#0d2c54', /* Azul oscuro */
              borderRadius:'20px',
              padding: '10px 30px', 
            }}>
            Aceptar
          </Button>
        </Box>
      </Paper>

    </Container>
  );
};
