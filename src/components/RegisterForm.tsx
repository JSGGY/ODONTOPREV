import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { MailIcon, LockIcon, UserIcon, CheckIcon } from 'lucide-react';
import { Footer } from './Footer';  // Asegúrate de tener este componente
import { Logo } from './Logo';  // Asegúrate de tener este componente
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function RegisterForm({ handleSubmit }: any) {
  const [username, setName] = useState<string>(''); // Aquí sigue existiendo para el formulario, pero no en la validación
  const [userLastName, setUserLastName] = useState<string>(''); // Aquí sigue existiendo para el formulario, pero no en la validación
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean>(true); // Valor inicial válido
  const [isFormValid, setIsFormValid] = useState<boolean>(false); // Valor inicial falso

  // Validación de la contraseña
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/;
    return regex.test(password);
  };

  // Validación del correo electrónico
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._/-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  // Verificación de contraseñas coincidentes
  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValidCheck = validatePassword(password);

    setPasswordValid(isPasswordValidCheck);  // Verificar la validez de la contraseña

    const match = password === confirmPassword;
    setIsPasswordMatch(match);


    // Validar el correo electrónico
    if (!isEmailValid) {
      setEmailError('Correo electrónico no válido');
    } else {
      setEmailError('');
    }

    // Validación de contraseña
    if (!isPasswordValidCheck) {
      setPasswordError('La contraseña debe tener entre 7 y 12 caracteres y contener al menos uno de los siguientes caracteres especiales: . / @');
    } else {
      setPasswordError('');
    }

    if (!isPasswordMatch) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
    setIsFormValid(isEmailValid && isPasswordValidCheck && isPasswordMatch);

    console.log("Arguments Password and Email: ", isEmailValid, isPasswordValidCheck, isPasswordMatch);
  }, [email, password, confirmPassword]);


  // Funcion para enviar los datos al servidor
  // Función para manejar el registro
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRegisterError('');  // Limpiar error de registro

    // Verificar si todos los campos son válidos
    if (!isFormValid) {
      setRegisterError('Por favor, complete todos los campos correctamente');
      return;
    }

    try {
      // Realizamos la solicitud POST con axios
      const response = await axios.post('http://localhost:5000/register', {  // Asegúrate de que esta URL coincida con la del backend
        username,
        email,
        password,
      });

      if (response.status === 200) {
        // Si el registro es exitoso, maneja la respuesta
        handleSubmit(response.data);
      }
    } catch (error: any) {
      setRegisterError(error.response?.data?.error || 'Hubo un error al registrar al usuario');
    }
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
          onChange={(e) => setName(e.target.value)}
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
          value={userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
          InputProps={{
            startAdornment: <UserIcon style={{ marginRight: '8px' }} />,
            endAdornment: userLastName && <CheckIcon color="primary" />,
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
          error={!!emailError}
          helperText={emailError}
          InputProps={{
            startAdornment: <MailIcon style={{ marginRight: '8px' }} />,
            endAdornment: validateEmail(email) && <CheckIcon color="primary" />,
          }}
        />

        {/* Mensaje de validación del correo electrónico */}
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="body2" color={validateEmail(email) ? 'green' : 'red'}>
            {validateEmail(email) ? 'El correo electrónico es válido.' : 'El correo electrónico no es válido.'}
          </Typography>
        </Box>

        <TextField
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,
            endAdornment: (
              <>
                {password && validatePassword(password) && <CheckIcon color="primary" />}
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </>
            ),
          }}
        />
        {password && (
          <Box sx={{ marginTop: 1, padding: 1, backgroundColor: passwordValid ? 'lightgreen' : 'lightcoral', borderRadius: 1 }}>
            <Typography variant="body2" color={passwordValid ? 'green' : 'red'}>
              {passwordValid
                ? 'La contraseña es válida (7-12 caracteres, y un carácter especial . / @).'
                : 'La contraseña no cumple con los requisitos. '}
            </Typography>
          </Box>
        )}


        <TextField
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!isPasswordMatch && confirmPassword.length > 0}
          helperText={!isPasswordMatch && confirmPassword.length > 0 ? 'Las contraseñas no coinciden' : ''}
          InputProps={{
            startAdornment: <LockIcon style={{ marginRight: '8px' }} />,
            endAdornment: (
              <>
                {isPasswordMatch && confirmPassword && <CheckIcon color="primary" />}
                <IconButton onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </>
            ),
          }}
        />

        {/* Mensaje de coincidencia de contraseñas */}
        {confirmPassword && (
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2" color={isPasswordMatch ? 'green' : 'red'}>
              {isPasswordMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden.'}
            </Typography>
          </Box>
        )}

        {registerError && <Typography color="error">{registerError}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isFormValid}>
          Registrar
        </Button>

      </form>
      <Footer />
      <Footer />
    </Box>
  );
}

export default RegisterForm;
