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
import DinamicForm from './DinamicForm';
import {Conjuntos} from '../../testData';
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
};
const defaultState = {
        tipoAgrupacion: {},
        tipoInmueble: {}
    }
const ConfigurarConjuntos = () => {
    const [currentConjuntoData,SetCurrentConjuntoData] = useState({});
    const [isEnableButtons,setEnableButtons] = useState(false);
    const toggleConjunto =(e)=>{
        SetCurrentConjuntoData(e.target.value)
        setEnableButtons(true);
        setValues(defaultState)
        console.log(currentConjuntoData)
    }
    const [isNext,setNext] = useState(false);


    const [isAgrupacion,setIsAgrupacion] = useState(false);
    const [isUnidad,setIsUnidad] = useState(false);
    const toggleAgrupacion =()=>{
        setValues(defaultState)
        setIsAgrupacion(true);
        setIsUnidad(false);
        }
    const toggleNext =()=>{
         if(!isNext && !isUnidad){
            setNext(true);
            toggleUnidad();
         }else{
            setNext(false);
            setIsAgrupacion(false);
            setIsUnidad(false);
         }
        }
    const toggleUnidad =()=>{
        setValues(defaultState)
        setIsAgrupacion(false);
        setIsUnidad(true);
        }
    const [values, setValues] = useState({
        tipoAgrupacion: '',
        tipoInmueble: ''
        });
    return (
        <Box sx={{  flexGrow: 1 }} className="card">
        <Typography variant="h4" align="center" component="h1" gutterBottom>Configuracion de Conjuntos</Typography>
            <Typography align="center" component="p" gutterBottom>
                Un conjunto necesita viviendas!, es por eso que aquí puedes agregar las residencias
                necesarias para los inquilinos
                </Typography>
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={6}>
                    <Paper >  
                            <img
                                src="/customConjunto.png" 
                                className="image"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={6} >
                    <Box component="form" onSubmit={handleSubmit} noValidate  textAlign='center' > 
                        <br/>
                        <br/>
                        <div>
                        <TextField variant="outlined" id="select" label="Conjunto" select required fullWidth
                            onChange={toggleConjunto} >
                                {Conjuntos?.map((conjunto)=>{
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
                   <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                   {
                       isEnableButtons?
                       <Stack direction="row" spacing={2} alignItems="left" justifyContent="center">
                           <Box textAlign='center'>
                        <Button onClick={toggleAgrupacion} variant="contained" color="info" size="small"
                                >Crear Agrupacion</Button>
                        </Box>
                        <Box textAlign='center'>
                            <Button onClick={toggleUnidad} size="small" variant="contained" color="info">Crear Inmueble</Button>
                        </Box>
                       </Stack>:
                       <div></div>
                   }
                    </Stack>
                    {
                        isAgrupacion? 
                            <DinamicForm name="Agrupacion" type={currentConjuntoData.tipoAgrupacion} toggleNext={toggleNext}/>
                        :
                        isUnidad?
                            <DinamicForm name="Unidad" type={currentConjuntoData.tipoInmueble} toggleNext={toggleNext}/>
                            :
                        <div></div>
                    }
                </Grid> 
            </Grid>
        </Box>
    )
}

export default ConfigurarConjuntos
