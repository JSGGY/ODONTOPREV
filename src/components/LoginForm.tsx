import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { MailIcon, LockIcon, LogInIcon } from 'lucide-react';
import CryptoJS from 'crypto-js';  // Importamos crypto-js para el hashing
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para la redirección
import { Logo } from './Logo';  // Asegúrate de tener este componente
import { Footer } from './Footer';  // Asegúrate de tener este componente

export function LoginForm({ handleSubmit }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // Estado para habilitar el botón

  const navigate = useNavigate();  // Inicializamos useNavigate

  // Función para validar el formato del correo
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._/-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Función para validar la contraseña
  const validatePassword = (password: string) => {
    // Expresión regular modificada
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
    return regex.test(password);
  };
  // Función para validar la contraseña
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.\-/@])[A-Za-z\d.\-/@]{7,}$/;
    return regex.test(password);
  };

  // Verificamos si el formulario es válido
  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setIsFormValid(isEmailValid && isPasswordValid);
    
    if (!isEmailValid) {
      setEmailError('Correo electrónico no válido');
    } else {
      setEmailError('');
    }

    if (!isPasswordValid) {
      setPasswordError('La contraseña debe tener al menos 7 caracteres');
    } else {
      setPasswordError('');
    }
  }, [email, password]);

  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(''); // Limpiar error de login

    // Comprobamos si las credenciales son correctas
    if (email === 'lagh@yahoo.com' && password === 'milo2315.') {
      // Si las credenciales son correctas, redirigimos a la página principal
      navigate('/main');  // Cambia '/main' por la ruta que necesitas
    } else {
      // Si las credenciales son incorrectas, mostramos un error
      setLoginError('Correo o contraseña incorrectos');
    }
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
            startAdornment: <MailIcon style={{ marginRight: '8px' }} />,
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
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,
          }}
        />
        {loginError && <Typography color="error">{loginError}</Typography>}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          startIcon={<LogInIcon />} 
          disabled={!isFormValid}
        >
          Iniciar Sesión
        </Button>
      </form>
      <Footer />
    </Box>
  );
}

export default LoginForm;
