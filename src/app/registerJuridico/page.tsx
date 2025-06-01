'use client'; 

import React, { useState } from 'react';
  
import {
    TextField,
    Button,
    Container,
    Typography,
    Paper,
    Box
} from '@mui/material'; 

import '../../styles/Formulario.module.css';
import '../../styles/Globals.module.css';
 export default function ProjectNameInput() { 

  const [projectName, setProjectName] = useState('');

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };



  return (
   
       <Box
         className="main-container"
         sx={{
           display: 'grid',
           gridTemplateColumns: '1fr 1fr', // Dividir en dos columnas
           minHeight: '100vh',
         }}
       >
         {/* Sección izquierda: Formulario */}
         <Container
           sx={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
           }}
         >
           <Paper
             className="register-paper"
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
                 color: '#007bff', // Azul claro
                 fontWeight: 'bold',
                 textAlign: 'center',
               }}
             >
               Registro del Proyecto 
             </Typography>
             <TextField
                   label="Nombres y Apellidos: (Representante Legal)"
                   fullWidth
                   type="email"
                   margin="normal"            
                   sx={{
                     backgroundColor: '#eaf4fc',
                     borderRadius: 2,
                   }}
                 />
                 <TextField
                   label= 'Cedula de identidad: (Representante Legal)'
                   fullWidth
                   margin="normal"
                   sx={{
                     backgroundColor: '#eaf4fc',
                     borderRadius: 2,
                   }}
                 />
                 <TextField
                 label = 'Describcion del Proyecto (Longitud Maxima 1100)'
                 fullWidth
                margin="normal"
                multiline
                minRows={3} // Número inicial de filas visibles
                maxRows={10} // Número máximo de filas visibles
                inputProps={{
                maxLength: 1100, // Longitud máxima del texto
                }}    
                 sx={{
                  backgroundColor: '#eaf4fc',
                  borderRadius: 2,
                }}
                 />
                 <Box
                   className="register-button-container"
                   sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     marginTop: 3,
                   }}
                 >
                   <Button
                     className="register-button">
                     Cargar Documentos
                   </Button>
                 </Box>
           </Paper>
         </Container>
   
         {/* Sección derecha: Imagen */}
         <Box
           sx={{
             backgroundImage: `url(${require('../../../public/images/Mensaje-Registro.png')})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
           }}
         ></Box>
       
       </Box>
);
}; 