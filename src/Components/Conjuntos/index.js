import React,{useState} from 'react'

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import './conjuntos.css';
import {Conjuntos as conjuntos} from '../../testData';

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
};
const defaultState = {
    tipoAgrupacion: '',
    tipoInmueble: ''
}
const Conjuntos = () => {
    const [currentConjuntoData,SetCurrentConjuntoData] = useState([]);
    const [isEnableButtons,setEnableButtons] = useState(false);
    const toggleConjunto =(e)=>{
        setValues(defaultState)
        setEnableButtons(true);
        SetCurrentConjuntoData(e.target.value)
        }

    const [isAgrupacion,setIsAgrupacion] = useState(false);
    const [isInmueble,setIsInmueble] = useState(false);
    const [isEnableButton,setEnableButton] = useState(false);
    const toggleAgrupacion =()=>{
        setValues(defaultState)
        setIsAgrupacion(true);
        setIsInmueble(false);
        }
    const toggleInmueble =()=>{
        setValues(defaultState)
        setIsAgrupacion(false);
        setIsInmueble(true);
        }
    const handleSubmit = (event) => {
        if(isAgrupacion){
            setIsAgrupacion(false);
            setIsInmueble(true);
            event.preventDefault();
        }
        
        else{
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            // enviar datos al back
            setIsAgrupacion(false);
            setIsInmueble(false);
            setEnableButton(false);
            console.log({
                tipoAgrupacion: data.get('tipoAgrupacion'),
                tipoInmueble: data.get('tipoInmueble'),
            });
        }
    };
    const handleOnChange = (name, value) => {
        setValues(defaultState)
        setValues({
            ...values,
            [name]: value
        });
      };
    const [values, setValues] = useState({
        tipoAgrupacion: '',
        tipoInmueble: '',
        });
    return (
        <Box sx={{  flexGrow: 1 }} className="card">
        <Typography variant="h4" align="center" component="h1" gutterBottom>Conjuntos</Typography>
            <Typography align="center" component="p" gutterBottom>
                A continuación podrás indicar que tipo de conjunto quieres tener, no es necesario 
                 contar con una agrupacion.
                </Typography>
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={6} >
                    <Box component="form" onSubmit={handleSubmit} noValidate  textAlign='center' > 
                        <br/>
                        <br/>
                        <div>
                        <TextField variant="outlined" id="select" label="Conjunto" select required fullWidth
                            onChange={toggleConjunto} >
                                {conjuntos?.map((conjunto)=>{
                                    return (
                                        <MenuItem id={conjunto.id}
                                                name={conjunto.nombre} 
                                                value={conjunto}
                                                key ={conjunto.id}
                                                >
                                            {conjunto.nombre}
                                        </MenuItem>      
                                    )                 
                                })
                                }
                        </TextField>
                        </div>
                        <br/>
                       
                   </Box>
                   {
                       isEnableButtons?
                       <Stack direction="row" spacing={2} alignItems="left" justifyContent="center">
                           <Box textAlign='center'>
                        <Button onClick={toggleAgrupacion} variant="contained" color="info" size="small"
                                >Crear Tipo Agrupacion</Button>
                        </Box>
                        <Box textAlign='center'>
                            <Button onClick={toggleInmueble} size="small" variant="contained" color="info">Crear Tipo Inmueble</Button>
                        </Box>
                       </Stack>:
                       <div></div>
                   }
                   <br/>
                   <br/>

                    <Box component="form" onSubmit={handleSubmit} noValidate  textAlign='center' > 
                    {
                        isAgrupacion? 
                        <div>
                            <TextField
                            size="small"
                            required
                            id="tipoAgrupacion"
                            name="tipoAgrupacion"
                            label="Agrupacion"
                            variant="outlined"
                            helperText="tipo de Agrupacion"
                            value={values.tipoAgrupacion}
                            onChange={e=> handleOnChange("tipoAgrupacion",e.target.value)}
                            />
                             <Box textAlign='center'>
                                <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                            </Box>
                        </div>
                        :
                        isInmueble?
                        <div>
                            <TextField
                                size="small"
                                required
                                id="tipoInmueble"
                                name="tipoInmueble"
                                label="Inmueble"
                                variant="outlined"
                                helperText="tipo de Inmueble"
                                value={values.tipoInmueble}
                                onChange={e=> handleOnChange("tipoInmueble",e.target.value)}
                                />
                             <Box textAlign='center'>
                                <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                            </Box>
                        </div>
                        :
                        <div></div>
                    }
                    </Box>
                </Grid> 
                <Grid item xs={6}>
                <Paper >  
                        <img
                            src="/conjunto.png" 
                            className="image"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Conjuntos
