import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import LoginForm from '../components/LoginForm';  // Asegúrate de importar tu formulario de login
import RegisterForm from '../components/RegisterForm';  // Asegúrate de importar tu formulario de registro
import loginImage from '../assets/chair-2584260_1920.jpg';  // Importar la imagen

export function Main() {
  const [isLogin, setIsLogin] = useState(true);  // Estado para alternar entre Login y Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (data: any) => {
    console.log('Datos recibidos:', data);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',  // Asegura que ambas cajas tengan la misma altura
          justifyContent: 'center',
          height: '100vh',  // Altura total de la ventana
          maxWidth: '80%',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Formulario a la izquierda con 50% del ancho en pantallas grandes */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: { xs: '100%', md: '50%' },
            padding: 2,
            backgroundColor: 'white',
            boxShadow: 2,
            borderRadius: 2,
            height: '100%',  // La altura de esta caja es 100% para igualarla a la otra
            overflow: 'hidden',
            transition: 'transform 0.5s ease-in-out',
            transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </Typography>

          {/* Caja para el formulario (desplazable) */}
          <Box
            sx={{
              width: '100%',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 150px)',  // Limita la altura del formulario
              padding: 2,
            }}
          >
            {/* Formulario de Login o Registro */}
            {isLogin ? (
              <LoginForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                error={error}
              />
            ) : (
              <RegisterForm
                email={email}
                password={password}
                username={username}
                setEmail={setEmail}
                setPassword={setPassword}
                setUsername={setUsername}
                onSubmit={handleSubmit}
                error={error}
              />
            )}
          </Box>

          {/* Botón para cambiar entre Login y Register */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              marginTop: 1,
              padding: '10px',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={() => setIsLogin((prev) => !prev)}  // Alternar entre login y registro
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </Box>

        {/* Caja de la imagen con 50% de ancho */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'block' },
            backgroundImage: `url(${loginImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',  // Altura de la imagen es 100vh para igualarla con el formulario
            maxWidth: '50%',
            overflow: 'hidden',
            borderRadius: '20px',
            transition: 'transform 0.5s ease-in-out',
            transform: isLogin ? 'translateX(0)' : 'translateX(-100%)',
          }}
        />
      </Box>
    </Container>
  );
}

export default Main;
