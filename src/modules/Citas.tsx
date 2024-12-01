import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

const Citas = ({ appointments, onAdd, onUpdate, onDelete, onBack }) => {
  const [newAppointment, setNewAppointment] = useState({ name: '', treatment: '', time: '' });

  const handleAdd = () => {
    onAdd(newAppointment);
    setNewAppointment({ name: '', treatment: '', time: '' });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button onClick={onBack}>Volver</Button>
      <Typography variant="h6">Gestión de Citas</Typography>
      <List>
        {appointments.map((appointment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={appointment.name}
              secondary={`${appointment.treatment} - ${appointment.time}`}
            />
            <Button onClick={() => onUpdate(index)}>Modificar</Button>
            <Button onClick={() => onDelete(index)}>Eliminar</Button>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Nombre"
          value={newAppointment.name}
          onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
        />
        <TextField
          label="Tratamiento"
          value={newAppointment.treatment}
          onChange={(e) => setNewAppointment({ ...newAppointment, treatment: e.target.value })}
        />
        <TextField
          label="Hora"
          value={newAppointment.time}
          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
        />
        <Button onClick={handleAdd}>Agregar Cita</Button>
      </Box>
    </Box>
  );
};

export default Citas;