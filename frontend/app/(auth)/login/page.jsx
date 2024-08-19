"use client"

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/forms/login-form'
import React, { useEffect } from 'react';

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirige al dashboard si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      router.push('/dashboard'); 
    }
  }, [user, router])

  return (
    <LoginForm />
  )
}

export default LoginPage
