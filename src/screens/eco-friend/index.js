import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const BankFileUpload = () => {
    const [selectedBank, setSelectedBank] = useState('');
    const [file, setFile] = useState(null);
    const [step, setStep] = useState(1);

    const banks = [
        { name: 'Santander', logo: '/eco-friend/santander_logo.png' },
        { name: 'Abanca', logo: '/eco-friend/abanca_logo.png' },
    ];

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
        setStep(2);
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (!file) {
            alert('Please upload a file before proceeding.');
            return;
        }

        // Process the selected file here
        alert(`Bank: ${selectedBank}\nFile: ${file.name}`);
        // You can now send the file and bank information to your backend
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2,
            }}
        >
            {step === 1 && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Select Your Bank
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: 3,
                        }}
                    >
                        {banks.map((bank) => (
                            <Card
                                key={bank.name}
                                sx={{ width: 200, height: 200, cursor: 'pointer' }}
                                onClick={() => handleBankSelect(bank.name)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: '100%', objectFit: 'contain' }}
                                        image={bank.logo}
                                        alt={`${bank.name} logo`}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" textAlign="center">
                                            {bank.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </>
            )}

            {step === 2 && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Upload Your Bank Statement
                    </Typography>

                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{ marginBottom: 3 }}
                    >
                        Upload File
                        <input
                            type="file"
                            accept=".xls,.xlsx"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>

                    {file && (
                        <Typography variant="body1" gutterBottom>
                            Selected File: {file.name}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!file}
                    >
                        Submit
                    </Button>
                </>
            )}
        </Box>
    );
};

export default BankFileUpload;
