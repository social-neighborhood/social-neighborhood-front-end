import React,{useState} from 'react'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DropForm from '../Conjuntos/DropForm';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';


import axios from 'axios';
import DropFormConjunto from '../Conjuntos/DropFormConjunto';
import DropFormConjunto2 from '../Conjuntos/DropFormConjunto2';
import DropFormConjunto3 from '../Conjuntos/DropFormConjunto3';

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
};
const defaultState = {
        tipoAgrupacion: {},
        tipoInmueble: {}
    }

const ConfigurarConjuntos = ({user,conjunto}) => {
    const [currentInmueble,setCurrentInmueble] = useState('');
    const toggleCurrentInmueble = (value)=> {
        setCurrentInmueble(value);
        console.log("ajksdhkashd")
        value.preventDefault();
   }
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
    const toggleUnidad =(event)=>{
        console.log(event)
        setIsAgrupacion(false);
        setIsUnidad(true);
        }
    const toggleUnidads =()=>{}
    const submited3 =()=>{
        setIsAgrupacion(false);
        setIsUnidad(true);
        }
    const handleSubmit =(event)=>{
        console.log(currentInmueble)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // enviar datos al back
        console.log(event.currentTarget);
        console.log({
            tipoAgrupacion: data.get('TipoAgrupacionesPropia'),
            tipoInmueble: data.get('nAgrupacion')
        });
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
        axios.get(window.$dir+`admin/`+currentConjuntoData.idConjunto+`/tipoAgrupacion`
            ).then(res =>{     
                handleChange(res.data);
                toggleAgrupacion();
            }).catch(
                e =>{console.log("No se encuentra tipo agrupacion: "+e)}
            )
        axios.get(window.$dir+`admin/`+currentConjuntoData.idConjunto+`/tipoInmueble`
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
        <Box sx={{  flexGrow: 1,mx:0}} className="card">
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
                            <DropFormConjunto2 param='TipoAgrupacionesPropia' 
                                    location='admin' enableSubmit={false} 
                                    currentConjunto ={conjunto} currentUsuario={user} 
                                    location2='social' param3='tipoAgrupacionById' level={1} 
                                    enableSubmit = {true} param2='newAgrupacion'submited={toggleUnidads}
                                    />
                            </div>
                        :
                        isUnidad?
                        <div>
                            <DropFormConjunto3 param='TipoAgrupacionesPropia' 
                                    location='admin' enableSubmit={false} 
                                    currentConjunto ={conjunto} currentUsuario={user} 
                                    location2='social' param3='tipoAgrupacionById' 
                                    enableSubmit = {false} param2='newAgrupacion' 
                                    />
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
