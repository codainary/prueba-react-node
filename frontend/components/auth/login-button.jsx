"use client"

import PropTypes from 'prop-types';
import React from 'react'
import { useRouter } from 'next/navigation';

/**
 * @param {ReactNode} children
 * @param {string} mode
 * @param {boolean} asChild
 */
const LoginButton = ({ children, mode = "redirect", asChild}) => {
  const router = useRouter()
  
  // Redireccionar al login cuando se hace click
  const onClick = () => {
    router.push('/login')
  }

  if (mode === "modal") {
    return (
        <span>
        TODO: Implementar modal.
        </span>
    );
  }
    
  return (
    <span onClick={onClick} className='cursor-pointer'>
        {children}
    </span>
  )
}

// Definir los prop types para validación
LoginButton.propTypes = {
    children: PropTypes.node,
    mode: PropTypes.oneOf(["redirect", "modal"]),
    asChild: PropTypes.bool,
  };

export default LoginButton;