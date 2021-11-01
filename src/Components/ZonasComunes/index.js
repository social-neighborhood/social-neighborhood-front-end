import React,{useState} from 'react'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import DropForm from '../Conjuntos/DropForm';

import axios from 'axios';

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
};
const defaultState = {
        tipoAgrupacion: {},
        tipoInmueble: {}
    }
const ZonasComunes = () => {
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
        axios.get(`http://localhost:8080/admin/`+currentConjuntoData.idConjunto+`/tipoAgrupacion`
            ).then(res =>{     
                handleChange(res.data);
                toggleAgrupacion();
            }).catch(
                e =>{console.log("No se encuentra tipo agrupacion: "+e)}
            )
        axios.get(`http://localhost:8080/admin/`+currentConjuntoData.idConjunto+`/tipoInmueble`
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
        <Typography variant="h4" align="center" component="h1" gutterBottom>Zonas Comunes</Typography>
            <Typography align="center" component="p" gutterBottom>
                Siempre divertirse y compartir va ser muy importante para  crear una comunidad mas unida es por eso
                que aqui podrás añadir las zonas comunes con que cuenta tu conjunto con el fin de que estas puedan ser alquiladas
                y usadas por otros usuarios 
                </Typography>
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={4}>
                    <Paper >  
                            <img
                                src="/sport1.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper >  
                            <img
                                src="/sport2.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper >  
                            <img
                                src="/sport3.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >     
                <Grid item xs={4} > 
                    <DropForm param='zonacomun'
                    location='admin' enableSubmit={false} />
                </Grid>
                <Grid item xs={4}> 
                    <TextField
                        required
                        id="tiempoAlquiler"
                        name="tiempoAlquiler"
                        label="tiempo"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}> 
                    <TextField
                        required
                        id="costoAlquiler"
                        name="costoAlquiler"
                        label="costo de Alquiler"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
                <TextField
                        select required 
                        id="disponible"
                        name="disponible"
                        label="Disponible"
                        variant="outlined"
                    >
                    <MenuItem id="true"name="true" value="true">  true   </MenuItem>  
                    <MenuItem id="false"name="false" value="false">  false  </MenuItem>  
                </TextField>
            </Box>
            <br/>
            <Box textAlign='center'>
                <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
            </Box>
        </Box>
    )
    }    
export default ZonasComunes
