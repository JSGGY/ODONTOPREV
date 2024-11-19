import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Drawer,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Notifications,
  Search,
  Person,
  CalendarMonth,
  Group,
  EventAvailable,
  MonetizationOn,
  ArrowDropDown,
  MedicalInformation, // Ícono de servicios dentales
} from "@mui/icons-material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Dashboard.css";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState("#fff6f6");

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, module: string) => {
    setActiveModule(module);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveModule(null);
  };

  const changeColor = (color: string) => {
    setThemeColor(color);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: themeColor , overflow : "hidden"}}>
      {/* Menú Lateral */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            height: 60,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFCC80",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mr: 3, ml: 2 }}>
          <MedicalInformation sx={{ color: "#ffffff", mr: 1 }} /> {/* Ícono de Servicios Dentales */}
<Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.5rem' }}>
  DentalPro
</Typography>
        </Box>

        {/* Lista de navegación */}
        <List sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
          {[{ name: "Citas", icon: <CalendarMonth /> },
            { name: "Pacientes", icon: <Group /> },
            { name: "Tratamientos", icon: <EventAvailable /> },
            { name: "Facturación", icon: <MonetizationOn /> },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ width: "auto", justifyContent: "center", mr: 3 }}>
                <IconButton
                  sx={{ color: "#005eff" }}
                  onClick={(event) => handleMenuOpen(event, item.name)}
                >
                  {item.icon}
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#000000",
                    ml: 0.5,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                  {item.name === "Tratamientos" && <ArrowDropDown />}
                </Typography>
              </ListItem>
              {index < 3 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ bgcolor: "#ffffff", mx: 1 }}
                />
              )}
            </React.Fragment>
          ))}
        </List>

        {/* Barra de usuario */}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto", mr: 2 }}>
  {/* IconButton con color personalizado */}
  <IconButton sx={{ color: "#ff7c7c" }}> {/* Aquí cambiamos el color del icono */}
    <Notifications />
  </IconButton>

  {/* Nombre del doctor con color personalizado */}
  <Typography variant="body1" sx={{ ml: 2, color: "#ffffff" }}> {/* Aquí cambiamos el color del texto */}
    Dr. María García
  </Typography>

  {/* Avatar con fondo personalizado */}
  <Avatar sx={{ bgcolor: "#392eff", ml: 1, color: "#fff" }}> {/* Aquí cambiamos el color de fondo y texto del avatar */}
    MG
  </Avatar>
</Box>

      </Drawer>

      {/* Submenú Picker */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        sx={{ mt: 1 }}
      >
        {activeModule === "Tratamientos" && (
          <>
            <MenuItem onClick={handleMenuClose}>Blanqueamiento</MenuItem>
            <MenuItem onClick={handleMenuClose}>Ortodoncia</MenuItem>
            <MenuItem onClick={handleMenuClose}>Implantes</MenuItem>
          </>
        )}
        {activeModule === "Citas" && (
          <>
            <MenuItem onClick={handleMenuClose}>Reprogramar Cita</MenuItem>
            <MenuItem onClick={handleMenuClose}>Eliminar Cita</MenuItem>
          </>
        )}
        {activeModule === "Pacientes" && (
          <>
            <MenuItem onClick={handleMenuClose}>Nuevo Paciente</MenuItem>
            <MenuItem onClick={handleMenuClose}>Ver Historial</MenuItem>
          </>
        )}
        {activeModule === "Facturación" && (
          <>
            <MenuItem onClick={handleMenuClose}>Generar Factura</MenuItem>
            <MenuItem onClick={handleMenuClose}>Ver Facturas</MenuItem>
          </>
        )}
      </Menu>

      {/* Panel Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Barra Superior */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff6f6",
            boxShadow: "none",
            color: "#A9D6E5",
          }}
        >
          <Toolbar>
            <TextField
              placeholder="Buscar paciente, cita..."
              variant="outlined"
              size="small"
              sx={{
                flexGrow: 1,
                mr: 2,
                backgroundColor: "white",
                borderRadius: 1,
              }}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Toolbar>
        </AppBar>

        {/* Contenido Principal */}
        <Box sx={{ mt: 2 }}>
          {/* Tarjetas de Métricas */}
          <Grid container spacing={3}>
          {[{ title: "Pacientes Totales", value: 2845, icon: <Group sx={{ color: "#4caf50" }} />, growth: "+12%" },
  { title: "Citas este Mes", value: 184, icon: <EventAvailable sx={{ color: "#ff9800" }} />, growth: "+8%" },
  { title: "Ingresos Mensuales", value: "$24,500", icon: <MonetizationOn sx={{ color: "#2196f3" }} />, growth: "+15%" }]
    .map((card, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Card sx={{ backgroundColor: "#ffffff", color: "#000000", position: "relative" }}>
          <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Icono en la parte superior izquierda */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
              {card.icon}
            </Box>

            {/* Título en la parte central izquierda */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mt: 1 }}>
              <Typography variant="body2" sx={{ color: "gray", fontSize: "0.9rem" }}>
                {card.title}
              </Typography>
            </Box>

            {/* Valor en la parte inferior izquierda */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mt: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {card.value}
              </Typography>
            </Box>

            {/* Porcentaje alineado a la derecha superior */}
            <Box sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "green",
              fontWeight: "bold"
            }}>
              <Typography variant="subtitle2">
                {card.growth}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
</Grid>




          {/* Próximas Citas y Calendario */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#ffffff", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Próximas Citas
                  </Typography>
                  <List>
                    {[{ name: "Ana Martínez", treatment: "Limpieza Dental", time: "09:00" },
                      { name: "Carlos Ruiz", treatment: "Extracción", time: "10:30" }]
                      .map((appointment, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText
                            primary={appointment.name}
                            secondary={`${appointment.treatment} - ${appointment.time}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ backgroundColor: "#ffffff", height: "100%" }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Calendario
                  </Typography>
                  <div className="dental-pro-calendar" style={{ flexGrow: 1 }}>
                    <Calendar
                      value={date}
                      onChange={setDate}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
