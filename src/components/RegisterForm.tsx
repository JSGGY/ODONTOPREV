import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { MailIcon, LockIcon, UserIcon, CheckIcon } from 'lucide-react';
import CryptoJS from 'crypto-js';  // Importamos crypto-js para el hashing
// import { supabase } from '../supabase/supabaseClient';  // Asegúrate de que supabase esté correctamente configurado
import { Footer } from './Footer';  // Asegúrate de tener este componente
import { Logo } from './Logo';  // Asegúrate de tener este componente

export function RegisterForm({ handleSubmit }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // Validación de la contraseña
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
    return regex.test(password);
  };

  // Validación del correo electrónico
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._/-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Verificación de contraseñas coincidentes
  useEffect(() => {
    setIsPasswordMatch(password === confirmPassword);
    setPasswordValid(validatePassword(password));  // Verifica la validez de la contraseña mientras se escribe
  }, [password, confirmPassword]);

  // Verificar si todos los campos están completos y válidos
  const allFieldsValid = validateEmail(email) && validatePassword(password) && isPasswordMatch && username;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');  // Limpiar error de registro
    setPasswordError('');  // Limpiar error de contraseña
    setConfirmPasswordError('');  // Limpiar error de confirmación de contraseña

    // Validar la contraseña
    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener entre 7 y 12 caracteres y contener al menos uno de los siguientes caracteres especiales: . / @');
      return;
    }

    // Validar que las contraseñas coincidan
    if (!isPasswordMatch) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      return;
    }

    // Validar el correo electrónico
    if (!validateEmail(email)) {
      setRegisterError('Correo electrónico inválido');
      return;
    }

    // Hasheamos la contraseña
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    // Llamada a Supabase para registrar al usuario (comentada por ahora)
    /*
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword, // Si prefieres utilizar el hash, puedes hacerlo, o si no, pasa la contraseña sin cifrar
    });

    if (error) {
      setRegisterError(error.message);  // Mostrar error de registro si algo falla
    } else {
      console.log('Usuario registrado', user);
      handleSubmit(user, session); // Pasa la información al componente principal si el registro es exitoso
    }
    */

    // Para fines visuales, solo pasamos los datos como ejemplo
    handleSubmit({ username, email, password: hashedPassword });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Logo />  {/* Aquí agregamos el Logo */}
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Crear cuenta</Typography>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '360px' }}>
        <TextField
          label="Nombre del Personal"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <UserIcon style={{ marginRight: '8px' }} />,
            endAdornment: username && <CheckIcon color="primary" />, // Mostrar "visto" si el campo tiene valor
          }}
        />
        <TextField
          label="Apellido del Personal"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <UserIcon style={{ marginRight: '8px' }} />,
            endAdornment: username && <CheckIcon color="primary" />, // Mostrar "visto" si el campo tiene valor
          }}
        />
        <TextField
          label="Correo Electrónico"
          placeholder="ejemplo@dominio.com"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <MailIcon style={{ marginRight: '8px' }} />,
            endAdornment: validateEmail(email) && <CheckIcon color="primary" />, // Mostrar "visto" si el correo es válido
          }}
        />
        <TextField
          label="Contraseña"
          placeholder="Entre 7 y 12 caracteres, con un carácter especial (./@)"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}  // Mostrar error si la contraseña no es válida
          helperText={passwordError}  // Mensaje de error si la contraseña no cumple con los requisitos
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,
            endAdornment: password && validatePassword(password) && <CheckIcon color="primary" />, // Mostrar "visto" si la contraseña es válida
          }}
        />
        {/* Cuadro de validación de la contraseña */}
        {password && (
          <Box sx={{ marginTop: 1, padding: 1, backgroundColor: passwordValid ? 'lightgreen' : 'lightcoral', borderRadius: 1 }}>
            <Typography variant="body2" color={passwordValid ? 'green' : 'red'}>
              {passwordValid
                ? 'La contraseña es válida (7-12 caracteres, y un carácter especial . / @).'
                : 'La contraseña no cumple con los requisitos. '}
            </Typography>
          </Box>
        )}
        {/* Mensaje de validación del correo electrónico */}
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="body2" color={validateEmail(email) ? 'green' : 'red'}>
            {validateEmail(email) ? 'El correo electrónico es válido.' : 'El correo electrónico no es válido.'}
          </Typography>
        </Box>

        <TextField
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}  // Mostrar error si las contraseñas no coinciden
          helperText={confirmPasswordError}  // Mensaje de error si las contraseñas no coinciden
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,
            endAdornment: isPasswordMatch && <CheckIcon color="primary" />, // Mostrar "visto" si las contraseñas coinciden
          }}
        />

        {/* Mensaje de coincidencia de contraseñas */}
        {confirmPassword && (
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" color={isPasswordMatch ? 'green' : 'red'}>
              {isPasswordMatch ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
            </Typography>
          </Box>
        )}

        {registerError && <Typography color="error">{registerError}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!allFieldsValid}>
          Registrar
        </Button>
      </form>
      <Footer />
    </Box>
  );
}

export default RegisterForm;