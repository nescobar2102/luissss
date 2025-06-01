'use client';


import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch
} from '@mui/material'; 
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/api'; 

 
 export default function Register() {
  const [fullname, setFullName] = useState<string>('');
  const [identificacion, setIdentificacion] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefonoP, setTelefonop] = useState<string>('');
  const [telefonoS, setTelefonos] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegulated, setIsRegulated] = useState<boolean>(false);
  const [authorizationNumber, setAuthorizationNumber] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');

  const router = useRouter();

  const handleRegister = async () => {
    setError('');

    const userData = {
      cedula: identificacion,
      username: email,
      password,
      idusertype: parseInt(userType),
      participant: {
        documentid: identificacion,
        fullname,
        idbirthcountry: parseInt(nationality),
        authorizationnumber: authorizationNumber || '-',
        isregulatedsubject: isRegulated || false,
        phonenumber: telefonoP,
        address: telefonoS,
        iddocumenttype: userType === '1' ? 1 : 2,
      },
    };

    try {
      await registerUser(userData);
      localStorage.setItem('userEmail', email);
      setOpenModal(true);
    } catch (err: any) {
      setError(err.message || 'Error en el registro');
      console.error('Error de registro:', err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRegulated(event.target.checked);
  };

  return (
    <Box
      className="main-container"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper
          className="register-paper"
          sx={{ padding: 4, borderRadius: 4, maxWidth: 500, width: '100%', boxShadow: 3 }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>
            Tipo de Usuario
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-type-label">Tipo de Usuario</InputLabel>
            <Select
              labelId="user-type-label"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              sx={{ backgroundColor: '#eaf4fc', borderRadius: 2 }}
            >
              <MenuItem value="2">Persona Jurídica</MenuItem>
              <MenuItem value="1">Persona Natural</MenuItem>
            </Select>
          </FormControl>

          {userType && (
            <>
              <TextField
                className="custom-input"
                label={userType === '2' ? 'Razón Social' : 'Nombres y Apellidos'}
                fullWidth
                margin="normal"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label={userType === '2' ? 'RIF' : 'Cédula de Identidad'}
                fullWidth
                margin="normal"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
              />
              <TextField
                label="Correo electrónico"
                fullWidth
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: '#eaf4fc', borderRadius: 2 }}
              />
              <TextField
                label="Nueva Contraseña"
                fullWidth
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: '#eaf4fc', borderRadius: 2 }}
              />
              {userType === '1' && (
                <FormControl fullWidth margin="normal" className="custom-select">
                  <InputLabel id="nationality-label">Nacionalidad</InputLabel>
                  <Select
                    labelId="nationality-label"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    <MenuItem value="1">Venezuela</MenuItem>
                  </Select>
                </FormControl>
              )}
              <TextField
                label="Teléfono Principal"
                fullWidth
                margin="normal"
                value={telefonoP}
                onChange={(e) => setTelefonop(e.target.value)}
                sx={{ backgroundColor: '#eaf4fc', borderRadius: 2 }}
              />
              <TextField
                label="Teléfono Secundario"
                fullWidth
                margin="normal"
                value={telefonoS}
                onChange={(e) => setTelefonos(e.target.value)}
                sx={{ backgroundColor: '#eaf4fc', borderRadius: 2 }}
              />
              {userType === '2' && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Switch
                      checked={isRegulated}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'Sujeto regulado' }}
                    />
                    <Typography variant="body2"> ¿Es sujeto regulado? </Typography>
                  </Box>
                  {isRegulated && (
                    <TextField
                      label="N° Autorización"
                      fullWidth
                      margin="normal"
                      value={authorizationNumber}
                      onChange={(e) => setAuthorizationNumber(e.target.value)}
                    />
                  )}
                </>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  onClick={handleRegister}
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    borderRadius: 50,
                    padding: '10px 20px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    border: '2px solid #00aaff',
                    '&:hover': {
                      backgroundColor: '#00aaff',
                    },
                  }}
                >
                  Registrarse
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      <Box
        sx={{
          backgroundImage: `url(/images/Mensaje-Registro.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>

      <Modal open={openModal} onClose={() => router.push('/validate')}>
        <Box
          className="modal-box"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Aviso</Typography>
          <Typography variant="body1">
            Tu registro ha sido exitoso. Se ha enviado tu Usuario y un código a <strong>{email}</strong> para validar tu cuenta.
          </Typography>
          <Button
            onClick={() => router.push('/validate')}
            sx={{
              backgroundColor: 'transparent',
              color: 'black',
              borderRadius: 50,
              padding: '10px 30px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              border: '2px solid #00aaff',
              '&:hover': {
                backgroundColor: '#00aaff',
              },
            }}
          >
            Aceptar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}; 

