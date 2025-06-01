'use client'; 
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; // Usa módulos CSS
import logo from '../../public/images/Logo-Sandbox-Color.png'

import React from 'react';

export default function Home() {
  return (
      <> 
 
   <div className={styles.home_container}>
        <div className={styles.content_box}>
        <h1 className={styles.title}>Bienvenido al</h1>
        <p className={styles.subtitle}></p>

        <Image
          src={logo}
          alt="Sandbox Regulatorio"
          className={styles.logo}
          priority />
        <div className={styles.btn_container}>
          <Link href="/register">
            <button className={styles.btn}>Regístrate</button>
          </Link>
          <Link href="/login">
            <button className={styles.btn}>Iniciar Sesión</button>
          </Link>
        </div>
      </div>
    </div></>
  );
}
