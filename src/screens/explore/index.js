import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

function Explore() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();  // Hook for navigation

  // Manually define the components to show
  const componentList = [
    { name: 'SongAISplitter', module: 'SongAISplitter' },
    { name: 'GuitarAITuner', module: 'guitar-tuner' }
  ];

  // Handle button click to navigate
  const handleNavigate = (component) => {
    // Navigate to a new route based on the selected component
    navigate(`/${component}`);
  };

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Explore Projects
      </Typography>

      {/* Add margin-bottom for spacing */}
      <Typography variant="h5" paragraph style={{ marginBottom: '30px' }}>
        Click on a project to view its details.
      </Typography>

      {/* List of fixed components */}
      <List>
        {componentList.map((component, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setSelectedComponent(component.module)}>
              <ListItemText primary={component.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Render selected component as a card */}
      <div style={{ marginTop: '20px' }}>
        {selectedComponent ? (
          <Card>
            <CardContent>
              <Typography variant="h5">{selectedComponent}</Typography>
              <Typography variant="body1">Details about {selectedComponent} will be displayed here.</Typography>
              {/* Add a button that navigates to the selected component's route */}
              <Button onClick={() => handleNavigate(selectedComponent)} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Go
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1">Select a project to view its content.</Typography>
        )}
      </div>
    </Container>
  );
}

export default Explore;
