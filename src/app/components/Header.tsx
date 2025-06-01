// components/Header.tsx
'use client'; // si usas app router y necesitas que sea cliente

import React from 'react';
import { styled } from '@mui/system';
import Image from 'next/image';

const HeaderContainer = styled('div')({
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative' // Requerido para que Image funcione bien con layout="fill"
});

const HeaderImage = styled(Image)({
  objectFit: 'contain' // Mantiene la relación de aspecto
});

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderImage
        src="/images/cintillo.png" // Ruta relativa desde /public
        alt="Header"
        fill // Ocupa todo el contenedor
        priority // Optimiza la carga
      />
    </HeaderContainer>
  );
};

export default Header;