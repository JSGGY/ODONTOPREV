import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { MailIcon, LockIcon, LogInIcon } from 'lucide-react';
import CryptoJS from 'crypto-js';  // Importamos crypto-js para el hashing
import { supabase } from '../supabase/supabaseClient';  // Asegúrate de que supabase esté correctamente configurado
import { Logo } from './Logo';  // Asegúrate de tener este componente
import { Footer } from './Footer';  // Asegúrate de tener este componente

export function LoginForm({ handleSubmit }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // Estado para habilitar el botón

  // Función para validar el formato del correo
  const validateEmail = (email: string) => {
    // Expresión regular modificada para permitir '.', '@' y '/'
    const regex = /^[a-zA-Z0-9._/-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

// Función para validar la contraseña
const validatePassword = (password: string) => {
  // Expresión regular modificada
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.\-/@])[A-Za-z\d.\-/@]{7,}$/;
  return regex.test(password);
};

  // Verificamos si el formulario es válido
  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    // El formulario es válido si el correo y la contraseña cumplen con las validaciones
    setIsFormValid(isEmailValid && isPasswordValid);
    
    // Validación de correo electrónico
    if (!isEmailValid) {
      setEmailError('Correo electrónico no válido');
    } else {
      setEmailError('');
    }

    // Validación de contraseña
    if (!isPasswordValid) {
      setPasswordError('La contraseña debe tener al menos 7 caracteres');
    } else {
      setPasswordError('');
    }
  }, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');  // Limpiar error de login

    // Hasheamos la contraseña
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    // Llamada a Supabase para autenticar al usuario
    // Descomenta cuando tengas la base de datos configurada.
    /*
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password: hashedPassword, // Usar la contraseña hasheada
    });

    if (error) {
      setLoginError(error.message);  // Mostrar error si algo falla
    } else {
      console.log('Usuario autenticado', user);
      handleSubmit(user, session); // Pasa la información al componente principal si el login es exitoso
    }
    */

    // Para fines visuales, solo pasamos los datos como ejemplo
    handleSubmit({ email, password: hashedPassword });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Logo />
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Iniciar sesión</Typography>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '360px' }}>
        <TextField
          label="Correo Electrónico"
          placeholder="ejemplo@dominio.com"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}  // Mostrar error si es inválido
          helperText={emailError}  // Mensaje de error si el correo es inválido
          InputProps={{
            startAdornment: <MailIcon style={{ marginRight: '8px' }} />,  // Agregamos margen al icono
          }}
        />
        <TextField
          label="Contraseña"
          placeholder="Introduce tu contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}  // Mostrar error si es inválido
          helperText={passwordError}  // Mensaje de error si la contraseña no es válida
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,  // Agregamos margen al icono
          }}
        />
        {loginError && <Typography color="error">{loginError}</Typography>}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          startIcon={<LogInIcon />} 
          disabled={!isFormValid}  // Deshabilitar si el formulario no es válido
        >
          Iniciar Sesión
        </Button>
      </form>
      <Footer />
    </Box>
  );
}

export default LoginForm;