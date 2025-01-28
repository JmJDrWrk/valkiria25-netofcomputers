import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dynamically require all project components in the folder
//TODO: ADD TO PROJECTS POSSIBILITY TO AUTODOCUMENT THE UTILITY
const projectContext = require.context('../public/', true, /\.js$/);
console.log('projectContext', projectContext.keys())
const projectList = projectContext.keys()
  .filter(n => n.includes('miniroutes'))
  .map((key) => {
    const name = key.replace('./', '').replace('.js', '');
    return { name, module: name, short: name.split('/')[0] };
  });
console.log('projects', projectList)

function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projectList);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter projects based on the search query
    const query = searchQuery.toLowerCase();
    setFilteredProjects(
      projectList.filter((project) => project.name.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleNavigate = (moduleName) => {
    navigate(`/${moduleName}`);
  };

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Explore Projects
      </Typography>
      <Typography variant="h5" paragraph>
        Search and select a project to view its details.
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Grid of Project Cards */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {filteredProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{project.short}</Typography>
                <Typography variant="body2" color="textSecondary">
                  This is the {project.name} project.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                  onClick={() => handleNavigate(project.short)}
                >
                  View Project
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          No projects found. Try adjusting your search.
        </Typography>
      )}
    </Container>
  );
}

export default Explore;
