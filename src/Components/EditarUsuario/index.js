import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {Users as Usuarios} from '../../testData';
import {Conjuntos } from '../../testData';
import {unidadesVivienda} from '../../testData';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@mui/material/Grid';

import './register.css';
const defaultState = {
    conjunto: "",
    unidad: ""
  };
function Viviendas ({onRemove,onChange}){
    return(
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >  
                <Grid item xs={5} >                              
                    <TextField variant="outlined" id="select" label="Conjunto" select required fullWidth
                        onChange={onChange} >
                            {Conjuntos?.map((conjunto)=>{
                                return (
                                    <MenuItem id={conjunto.id}
                                            key ={conjunto.id}
                                            name={conjunto.nombre} 
                                            value={conjunto.nombre}
                                            >
                                        {conjunto.nombre}
                                    </MenuItem>      
                                )                 
                            })
                            }
                    </TextField>
                </Grid>
            <Grid item xs={5} >                              
                <TextField variant="outlined" id="select" label="Unidad" select required fullWidth
                    onChange={onChange} >
                        {unidadesVivienda?.map((uVivienda)=>{
                            return (
                                <MenuItem id={uVivienda.id}
                                        key ={uVivienda.id}
                                        name={uVivienda.nombre} 
                                        value={uVivienda.Agrupacion+" "+uVivienda.nAgrupacion+" "+
                                                uVivienda.Inmueble+" "+uVivienda.nInmueble
                                                }
                                        >
                                    {uVivienda.Agrupacion+" "+uVivienda.nAgrupacion+" "+
                                                uVivienda.Inmueble+" "+uVivienda.nInmueble}
                                </MenuItem>      
                            )                 
                        })
                        }
                </TextField>
            </Grid>
            <Grid item xs={2} >                              
                <Button onClick={onRemove} variant="outlined" color="error">Eliminar</Button>
            </Grid>
        </Grid>  
        </div>
    )
}
const EditarUsuario = () => {

    const [currentConjuntoData,SetCurrentConjuntoData] = useState({});
    const toggleConjunto =(e)=>{
        SetCurrentConjuntoData(e.target.value)
        console.log(currentConjuntoData)
    }

    const [rows, setRows] = useState([defaultState]);
    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setRows(copyRows);
      };
    const handleOnAdd = () => {
    setRows(rows.concat(defaultState));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
    };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
      };

    return (
        <div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
           <Typography variant="h4" align="center" gutterBottom>Usuarios</Typography>
           <div>
                <TextField variant="outlined" id="select" label="Usuario" select required fullWidth
                    onChange={toggleConjunto} >
                        {Usuarios?.map((usuario)=>{
                            return (
                                <MenuItem id={usuario.id}
                                        name={usuario.user} 
                                        value={usuario}
                                        key ={usuario.id}
                                        >
                                    {usuario.user}
                                </MenuItem>      
                            )                 
                        })
                        }
                </TextField>
            </div>               
            <br/>
        </Box>
        <div className="card">
            <Typography variant="h4" align="center" component="h1" gutterBottom >Viviendas</Typography>
                {rows.map((row, index) => (
                    <Viviendas
                    {...row}
                    onChange={(name, value) => handleOnChange(index, name, value)}
                    onRemove={() => handleOnRemove(index)}
                    key={index}
                    />
                ))}
            <Button onClick={handleOnAdd} variant="contained" color="success">Agregar</Button>
            </div>
        <Box textAlign='center'>
            <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
        </Box>
        </div>
    )
}

export default EditarUsuario
