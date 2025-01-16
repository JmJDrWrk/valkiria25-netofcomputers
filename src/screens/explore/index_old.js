import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Dynamically import all files from the ./incoming folder
const components = require.context('./incoming', false, /\.js$/);

function Explore() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const componentList = components.keys().map((key) => {
    const module = components(key).default;  // Import the default export of the component
    console.log('Imported component:', module);  // Log the component
    return { name: key, module };  // Store the component's name and module
  });

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Explore Incoming Projects
      </Typography>
      <Typography variant="h5" paragraph>
        Click on a project to view its details.
      </Typography>

      {/* List of components */}
      <List>
        {componentList.map((component, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setSelectedComponent(component.module)}>
              <ListItemText primary={component.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Log selected component */}
      {console.log('Selected Component:', selectedComponent)}

      {/* Render the selected component */}
      <div style={{ marginTop: '20px' }}>
        {selectedComponent ? (
          React.createElement(selectedComponent)  // Dynamically render the selected component
        ) : (
          <Typography variant="body1">Select a project to view its content.</Typography>
        )}
      </div>
    </Container>
  );
}

export default Explore;
