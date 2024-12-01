import { CalendarMonth, EventAvailable, MonetizationOn, ArrowDropDown } from "@mui/icons-material";
import { Drawer, Typography, ListItem, IconButton, Divider, Menu } from "@mui/material";
import { List, Group } from "lucide-react";
import { Box } from "@mui/material";
import React, { useState } from "react";


export const AppBarMainPage = () => {
    const [themeColor, setThemeColor] = useState("#fff6f6");
    const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
    const [activeModule, setActiveModule] = useState<string | null>(null);

    const changeColor = (color: string) => {
        setThemeColor(color);
    };

    // const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, module: string) => {
    //     setActiveModule(module);
    //     setMenuAnchor(event.currentTarget);
    // };

    // const handleMenuClose = (action) => {
    //     setMenuAnchor(null);
    //     setActiveModule(null);
    // };

    return (
        <>
            <Box sx={{ display: "flex", backgroundColor: themeColor, overflow: "hidden" }}>
                {/* Menú Lateral */}
                <Drawer
                    variant="permanent"
                    sx={{
                        "& .MuiDrawer-paper": {
                            height: 60,
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#87cee0",
                            overflow: "hidden",
                        },
                    }}
                >
                    <Box className="flex items-center mr-4 ml-2">
                        <img src="/src/assets/logo_RCD.png" alt="Logo RCD" className="h-10 w-10 mr-2" />
                        <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.5rem' }}>
                            RCD
                        </Typography>
                    </Box>
                </Drawer>

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
            </Box>
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
                        <MenuItem onClick={handleMenuClose}>Agendar Cita</MenuItem>
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

        </>
    );
}