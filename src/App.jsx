import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataTable from './components/DataTable';
import LineChart from './components/LineChart'; // Importar el nuevo componente del gráfico
import { Container } from '@mui/material';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';

const drawerWidth = 240; // Ancho de la barra de navegación

function App() {
  const [count, setCount] = useState(0)
  const [selectedView, setSelectedView] = useState('data-table'); // Vista seleccionada

  // Función para cambiar de vista
  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Visualización de datos sensores
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Barra de Navegación Lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* Opción para la tabla de datos */}
            <ListItem button onClick={() => handleViewChange('data-table')}>
              <ListItemText primary="Tabla de Datos" />
            </ListItem>

            {/* Opción para la otra vista */}
            <ListItem button onClick={() => handleViewChange('other-view')}>
              <ListItemText primary="Gráfico de Sensores" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Renderiza la vista seleccionada */}
        {selectedView === 'data-table' ? (
          <DataTable />
        ) : (
          <LineChart /> // Mostrar el gráfico en la otra vista
        )}
      </Box>
    </Box>
  )
}

export default App
