import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import './register.css';

const RegisterUser = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    };


    return (
        <div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" component="h1" gutterBottom>Crear usuario</Typography>
           <Stack direction="row" spacing={2}>
            <TextField
                    required
                    id="nombre"
                    label="nombre"
                    variant="outlined"
                    helperText="Nombres completos"
                    />
            <TextField
                    required
                    id="apellidos"
                    label="apellidos"
                    variant="outlined"
                    helperText="Apellidos completos"
                    />
            </Stack>
            <Stack direction="row" spacing={2}>
            <TextField
                    required
                    id="correo"
                    label="correo"
                    variant="outlined"
                    helperText="correo"
                    />
            <TextField
                    required
                    id="contraseña"
                    label="contraseña"
                    variant="outlined"
                    helperText="contraseña segura 7 carácteres"
                    />
            </Stack>
            <br/>
            <Box textAlign='center'>
                <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
            </Box>
        </Box>
        </div>
    )
}

export default RegisterUser
