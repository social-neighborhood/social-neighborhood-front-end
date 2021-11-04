import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import './registerUser.css';

import axios from 'axios';
import Swal from "sweetalert2";
const RegisterUser = () => {
    const handleSubmit = (event) => {
        let body={}
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        body={
                tdoc:data.get("tdoc"),
                ndoc:data.get("ndoc"),
                nombres:data.get("nombres"),
                apellidos:data.get("apellidos"),
                fechadenacimiento:data.get("fechadenacimiento"),
                email:data.get("email"),
                password:data.get("password"),
                tipousuario:"Residente"
        }
        axios.post(`https://socialneighborhood.herokuapp.com/social/newUsuario`, body)
        .then( function (response) {
        if (response.status === 200) {
        Swal.fire(
                'Usuario agregado correctamente',
                'success'
        )
        } else {
        Swal.fire("Something is Wrong :(!", "try again later", "error");
        }
        })
        .catch(function (errorx) {
        Swal.fire(""+errorx, "try again later", "error");
        });
    };


    return (
        <div className="RegisterComponent">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" component="h1" gutterBottom>Crear usuario</Typography>
           <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
           <TextField
                    required
                    id="tdoc"
                    name="tdoc"
                    label="Tipo"
                    variant="standard"
                    style ={{width: '10%'}}
                    />
            <TextField
                    required
                    id="ndoc"
                    name="ndoc"
                    label="numero de Documento"
                    variant="standard"
                    type="number"
                    />
            </Stack>
            <br/>
            <Stack direction="row" spacing={2}>
            <TextField
                    required
                    id="nombres"
                    name="nombres"
                    label="nombre"
                    variant="outlined"
                    helperText="Nombres completos"
                    size="small"
                    />
            <TextField
                    required
                    id="apellidos"
                    name="apellidos"
                    label="apellidos"
                    variant="outlined"
                    helperText="Apellidos completos"
                    size="small"

                    />
            <TextField
                    required
                    id="fechadenacimiento"
                    name="fechadenacimiento"
                    type="date"
                    variant="outlined"
                    size="small"
                    />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField
                    required
                    id="email"
                    name="email"
                    label="correo"
                    variant="outlined"
                    helperText="correo"
                    />
            <TextField
                    required
                    id="password"
                    name="password"
                    label="contraseña"
                    variant="outlined"
                    type="password"
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
