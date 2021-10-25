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
import DropForm from '../Conjuntos/DropForm';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';


import axios from 'axios';
import Swal from "sweetalert2";

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
    const [currentConjuntoData,SetCurrentConjuntoData] = useState({
        idConjunto:'',
        tipoAgrupacion: '',
        tipoInmueble: ''
        });
    const [isEnableButtons,setEnableButtons] = useState(false);

    const [isNext,setNext] = useState(false);


    const [isAgrupacion,setIsAgrupacion] = useState(false);
    const [isUnidad,setIsUnidad] = useState(false);
    const toggleAgrupacion =()=>{
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
        setIsAgrupacion(false);
        setIsUnidad(true);
        }
    const handleChange = data => {
        const { name, value } = data;
        SetCurrentConjuntoData({
            ...currentConjuntoData,
            [name]: value
        });
        console.log(currentConjuntoData)
    };
    const handleButtons =(e)=>{
        handleChange(e.target.id);
        setEnableButtons(true);
        axios.get(`https://socialneighborhood.herokuapp.com/admin/`+currentConjuntoData.idConjunto+`/tipoAgrupacion`
            ).then(res =>{     
                handleChange(res.data);
                toggleAgrupacion();
            }).catch(
                e =>{console.log("No se encuentra tipo agrupacion: "+e)}
            )
        axios.get(`https://socialneighborhood.herokuapp.com/admin/`+currentConjuntoData.idConjunto+`/tipoInmueble`
        ).then(res =>{   
            handleChange(res.data);
            toggleUnidad();
        }).catch(
            e =>{console.log("No se encuentra tipo inmueble: "+e)}
        )
    }
    const [nValues,setNvalues]= useState({
        nVivienda:'',
        nAgrupacion:''
    });
    const onChange = (name,value) => {
        setNvalues(
            {...nValues,
                [name]:value
            });
      };
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
                   <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
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
                    </Stack>
                    {
                        isAgrupacion? 
                            //tendria una lista de ids ahora hacer match de esas ids  con su nombre
                            //por cada dato en tipo de agrupaciones propias hacer: 
                            // axios.get tipo agrupacionbyId y si resulta meterlo a un menuList y sale
                            //añadir input del numero y se sube con un post a newAgrupacion
                            //al otro lado hace get agrupacion y hace match con el nombre respectivo
                            //por ello se va crear un nuevo tipo de form llamado dropMetaForm.js
                            <div>
                            <br/>
                            <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >                               
                                <Grid item xs={8} > 
                                    <DropForm param='TipoAgrupacionesPropia'
                                    location='admin' enableSubmit={false} />
                                </Grid>
                                <Grid item xs={4}> 
                                    <TextField
                                        required
                                        id="nAgrupacion"
                                        name="nAgrupacion"
                                        label="#"
                                        variant="outlined"
                                        value={nValues.nAgrupacion}
                                        onChange={e=> onChange("nAgrupacion",e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <br/>
                            <Box textAlign='center'>
                                <Button type="submit" variant="contained" color="success"endIcon={<SaveTwoToneIcon/>}>Confirmar</Button>
                            </Box>
                            </div>
                        :
                        isUnidad?
                            <div>
                            <br/>
                            <DropForm param='agrupacion'
                            location='admin' enableSubmit={false} />
                            <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >  
                            <Grid item xs={8} >                              
                                <DropForm param='TipoInmueblesPropia'
                                location='admin' enableSubmit={false} />
                            </Grid>
                            <Grid item xs={4} >                              
                            <TextField
                                required
                                id="nVivienda"
                                name="nVivienda"
                                label="#"
                                variant="outlined"
                                value={nValues.nVivienda}
                                onChange={e=> onChange("nVivienda",e.target.value)}
                            />                            
                            </Grid>
                            <TextField
                                        required
                                        id="costoAdministracion"
                                        name="costoAdministracion"
                                        label="Costo de Administracion"
                                        variant="outlined"
                                        type="number"
                                        value={nValues.nAgrupacion}
                                        onChange={e=> onChange("nAgrupacion",e.target.value)}
                                    />
                            </Grid>
                            <br/>
                            <Box textAlign='center'>
                                <Button type="submit" variant="contained" color="success"endIcon={<SaveTwoToneIcon/>}>Confirmar</Button>
                            </Box>
                            </div>
                            :
                        <div></div>
                    }
                </Grid> 
            </Grid>
        </Box>
    )
}

export default ConfigurarConjuntos
