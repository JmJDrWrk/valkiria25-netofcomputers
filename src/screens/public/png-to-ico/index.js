import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Container, Grid, Box } from '@mui/material';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const PNGtoICOConverter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  // Function to convert PNG to ICO
  const convertToICO = (img) => {
    return new Promise((resolve, reject) => {
      const sizes = [16, 32, 48, 64, 128];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const icoImages = [];

      const drawAndConvert = (size) => {
        return new Promise((resolve, reject) => {
          canvas.width = size;
          canvas.height = size;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, size, size);

          // Convert canvas to blob (PNG format)
          canvas.toBlob((blob) => {
            icoImages.push(blob);
            resolve();
          }, 'image/png');
        });
      };

      const processAllSizes = async () => {
        for (let size of sizes) {
          await drawAndConvert(size);
        }
        resolve(icoImages);
      };

      processAllSizes();
    });
  };

  // Handle conversion button click
  const handleConvert = async () => {
    if (!file) {
      setError('Please select a PNG file.');
      return;
    }
    setLoading(true);

    try {
      // Load the image
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;

      img.onload = async () => {
        // Convert to ICO format
        const icoImages = await convertToICO(img);

        // Create the ICO file (multiple PNGs as a single ICO format)
        const zip = new JSZip();
        icoImages.forEach((blob, index) => {
          zip.file(`icon-${[16, 32, 48, 64, 128][index]}.png`, blob);
        });

        // Generate ICO as a Zip file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Download the zip file
        saveAs(zipBlob, 'icons.zip');
        setLoading(false);
      };

      img.onerror = () => {
        setError('Failed to load the image.');
        setLoading(false);
      };
    } catch (error) {
      setError('Error during conversion.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          PNG to ICO Converter (Client-Side)
        </Typography>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <input
              accept="image/png"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-file"
            />
            <label htmlFor="upload-file">
              <Button variant="contained" component="span">
                Upload PNG
              </Button>
            </label>
          </Grid>
        </Grid>

        <Box mt={2}>
          {file && (
            <Typography variant="body1">
              Selected File: {file.name}
            </Typography>
          )}
        </Box>

        {error && (
          <Box mt={2}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        )}

        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleConvert}
            disabled={loading || !file}
          >
            {loading ? <CircularProgress size={24} /> : 'Convert to ICO'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PNGtoICOConverter;
