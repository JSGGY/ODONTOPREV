import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Box, Container, InputAdornment } from '@mui/material';
import { LogInIcon, MailIcon, LockIcon } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer';
import loginImage from '../assets/mouth-1437426_1280.jpg';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor ingrese todos los campos');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingrese un correo electrónico válido');
      return;
    }
    setError('');
    console.log('Formulario enviado', { email, password });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '100%', sm: '90%', md: '80%' },
          height: { xs: 'auto', md: '125vh' },
          boxShadow: 10,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Formulario */}
        <Box
          sx={{
            width: { xs: '100%', md: '60%' },
            padding: { xs: 3, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Logo />
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
            Iniciar sesión
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px' }}>
            {/* Campo de Correo Electrónico */}
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error && 'Correo no válido'}
              placeholder=" ejemplo@clinica.com"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MailIcon className="h-5 w-5 text-gray-400" />
                      <Box component="span" sx={{ mx: 1, borderLeft: '1px solid #ccc', height: '24px' }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* Campo de Contraseña */}
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" ••••••••"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LockIcon className="h-5 w-5 text-gray-400" />
                      <Box component="span" sx={{ mx: 1, borderLeft: '1px solid #ccc', height: '24px' }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* Mensaje de error */}
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ marginTop: 1 }}>
                {error}
              </Typography>
            )}

            {/* Recordarme */}
            <FormControlLabel control={<Checkbox />} label="Recordarme" sx={{ marginY: 1 }} />

            {/* Botón de iniciar sesión */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              startIcon={<LogInIcon />}
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* Mensaje adicional abajo */}
          <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 3 }}>
            ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
          </Typography>

          <Footer />
        </Box>

        {/* Esthetic Line Divider */}
        <Box
          sx={{
            width: '1.2px',
            backgroundColor: '#292323',
            marginX: 0.00,
          }}
        />

        {/* Imagen */}
        <Box
          sx={{
            width: { xs: '100%', md: '45%' },
            height: { xs: '200px', md: '100%' },
            backgroundImage: `url(${loginImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>
    </Container>
  );
}

export default Login;
