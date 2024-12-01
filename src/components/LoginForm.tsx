import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText 
} from '@mui/material';
import { MailIcon, LockIcon, LogInIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Footer } from './Footer';

export function LoginForm({ handleSubmit }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Estado para intentos de inicio de sesión
  const [loginAttempts, setLoginAttempts] = useState(() => {
    // Recuperar intentos de localStorage o iniciar en 0
    const savedAttempts = localStorage.getItem('loginAttempts');
    return savedAttempts ? parseInt(savedAttempts) : 0;
  });

  // Estado de bloqueo con persistencia
  const [isLocked, setIsLocked] = useState(() => {
    const lockedUntil = localStorage.getItem('lockoutUntil');
    if (lockedUntil) {
      const lockoutEndTime = parseInt(lockedUntil);
      return Date.now() < lockoutEndTime;
    }
    return false;
  });

  // Temporizador de bloqueo con persistencia
  const [lockoutTimer, setLockoutTimer] = useState(() => {
    const lockedUntil = localStorage.getItem('lockoutUntil');
    if (lockedUntil) {
      const remainingTime = Math.ceil((parseInt(lockedUntil) - Date.now()) / 1000);
      return remainingTime > 0 ? remainingTime : 30;
    }
    return 30;
  });

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._/-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Validación de contraseña: más de 7 caracteres
  const validatePassword = (password: string) => {
    return password.length > 7;
  };

  // Validate form on email/password change
  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError('Correo electrónico no válido');
    } else {
      setEmailError('');
    }

    if (!isPasswordValid) {
      setPasswordError('La contraseña debe tener más de 7 caracteres');
    } else {
      setPasswordError('');
    }
  }, [email, password]);

  // Lockout timer effect con persistencia
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && lockoutTimer > 0) {
      // Guardar tiempo de bloqueo en localStorage
      const lockoutEndTime = Date.now() + (lockoutTimer * 1000);
      localStorage.setItem('lockoutUntil', lockoutEndTime.toString());

      timer = setInterval(() => {
        const remainingTime = Math.ceil((lockoutEndTime - Date.now()) / 1000);
        
        if (remainingTime <= 0) {
          // Desbloquear
          setIsLocked(false);
          setLoginAttempts(0);
          setLockoutTimer(30);
          localStorage.removeItem('lockoutUntil');
          localStorage.removeItem('loginAttempts');
        } else {
          setLockoutTimer(remainingTime);
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLocked, lockoutTimer]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(''); // Clear previous login errors

    // Validate email and password before checking credentials
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // Check if account is locked
    if (isLocked) {
      return;
    }

    // Check credentials
    if (email === 'lagh@yahoo.com' && password === 'milo2315.') {
      // Successful login
      navigate('/main');
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutUntil');
    } else {
      // Increment login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      // Guardar intentos en localStorage
      localStorage.setItem('loginAttempts', newAttempts.toString());

      if (newAttempts >= 3) {
        // Lock account after 3 failed attempts
        setIsLocked(true);
        setLoginError('Demasiados intentos fallidos');
      } else {
        // Mostrar intentos restantes
        setLoginError(`Contraseña incorrecta. Quedan ${3 - newAttempts} intentos`);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Lockout Dialog */}
      <Dialog open={isLocked} aria-labelledby="lockout-dialog-title">
        <DialogTitle id="lockout-dialog-title">Cuenta Bloqueada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Demasiados intentos fallidos. 
            Por favor espere {lockoutTimer} segundos para intentar nuevamente.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Logo />
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Iniciar sesión
      </Typography>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '360px' }}>
        <TextField
          label="Correo Electrónico"
          placeholder="ejemplo@dominio.com"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          disabled={isLocked}
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
          disabled={isLocked}
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,
          }}
        />
        {loginError && (
          <Typography color="error" sx={{ marginTop: 1, textAlign: 'center' }}>
            {loginError}
          </Typography>
        )}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          startIcon={<LogInIcon />} 
          disabled={!validateEmail(email) || !validatePassword(password) || isLocked}
        >
          Iniciar Sesión
        </Button>
      </form>
      <Footer />
    </Box>
  );
}

export default LoginForm;