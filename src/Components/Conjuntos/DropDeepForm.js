import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";

const defaultState = {
    id:'',
    conjunto:'',
    tipoAgrupacion:'',
    numeroAgrupacion:'',
    tipoInmueble:'',
    numeroInmueble:'',
    costoAdministracion:''
};
const defaultState0 = [];
const defaultState3 = {};
const defaultState2 = {
    id:'',
    idAgrupacion:'',
    idTipoInmuebleConjunto:'',
    numInmueble:'',
    costoAdministracion:''
};
const DropDeepForm = ({param,location,onChange,enableSubmit,param2,currentConjunto,submited}) => {
    const [data,setData]= useState(defaultState0)
    const [datas,setDatas]= useState(null)
    const [viviendas,setViviendas]= useState([defaultState])
    const vivienda ={
        id:'',
        conjunto:'',
        tipoAgrupacion:'',
        numeroAgrupacion:'',
        tipoInmueble:'',
        numeroInmueble:'',
        costoAdministracion:''
    }
    const handleOnChange = (index, name, value) => {
        const copyRows = [...viviendas];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setDatas(copyRows);
      };
    const fetchData = useCallback(async () => {
            // get unidades de vivienda by Email
            await axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ param
            ).then(res =>{  
                const dataRes = res.data         
                setDatas(dataRes)
                console.log(datas)
                //por cada unidad de vivienda hacer
                datas.map((index)=>{
                    let agrupacionId = index.idAgrupacion
                    let tipoInmuebleConjuntoId = index.idTipoInmuebleConjunto
                    // busqueda profunda por agrupacion
                    axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ `agrupacionById`+`/`+agrupacionId
                    ).then(res =>{   
                        const datares2 = res.data
                        handleOnChange(index,"numAgrupacion",datares2.numAgrupacion)
                        let tipoAgrupacionConjuntoId = datares2.idtipoagrupacionconjunto
                        axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ `tipoAgrupacionConjuntoById`+`/`+tipoAgrupacionConjuntoId
                        ).then(res =>{    
                            const datares3 = res.data       
                            handleOnChange(index,"idconjunto",datares3.numAgrupacion)
                            let idTipoAgrupacion = datares3.idtipoagrupacion
                            axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ `tipoAgrupacionById`+`/`+idTipoAgrupacion
                                ).then(res =>{  
                                    const datares4 = res.data                
                                    handleOnChange(index,"nombreAgrupacion",datares4.nombre)       
                                }).catch(
                                    e =>{console.log("Error: El id del tipoAgrupacion no se encuentra "+e)}
                                )
                            }).catch(
                                e =>{console.log("Error: El id del tipoAgrupacionConjunto no se encuentra "+e)}
                            )           
                    }).catch(
                        e =>{console.log("Error: El Id de agrupacion no fue encontrado "+e)}
                    )
                    //busqueda profunda por inmueble
                    axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ `tipoInmuebleConjuntoById`+`/`+tipoInmuebleConjuntoId
                        ).then(res =>{    
                            const datares5 = res.data
                            let tipoInmuebleId = datares5.idtipoinmueble  
                            axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ `tipoInmuebleById`+`/`+tipoInmuebleId
                            ).then(res =>{     
                                const datares6 = res.data      
                                handleOnChange(index,"nombreInmueble",datares6.nombre)       
                            }).catch(
                                e =>{console.log("Error: El id del tipoInmueble no se encuentra "+e)}
                            )
                        }).catch(
                            e =>{console.log("Error: El id del tipoInmuebleConjunto no se encuentra "+e)}
                        )     
                })
                console.log(datas)      
            }).catch(
                e =>{console.log("Error: No se encuentran unidades de vivienda para el Usuario "+e)}
            )
        },[param])
    useEffect(()=>{
        fetchData()
    },[fetchData])
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        // enviar datos al back
        let body ={}
        if (param2 = "newTipoAgrupacion")
            body={
                idconjunto:currentConjunto,
                tipoAgrupacionConjunto:data.id}
        body={
            idconjunto:currentConjunto,
            tipoInmuebleConjunto:data.id}
        axios.post(`https://socialneighborhood.herokuapp.com/admin/`+param2, body)
        .then( function (response) {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
            Swal.fire(
                'Tipo actualizado correctamente',
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
        <div>
                <div>
                <Box component="form" onSubmit={handleSubmit} noValidate  > 
                <TextField variant="outlined" id="select" label={param} select required fullWidth
                    onChange={fetchData} >
                        {datas?.map((element)=>{
                            return (
                                <MenuItem id={element.id}
                                        key ={element.id}
                                        name={element.nombre || element.nombres} 
                                        value={element.nombre || element.nombres} 
                                        onClick={onChange}
                                        >
                                    {element.nombre || element.nombres}
                                </MenuItem>      
                            )                 
                        })
                        }
                </TextField>
                {
                enableSubmit?
                <Box textAlign='center'>
                    <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                </Box>
                :<div></div>
                }
                </Box>
                </div>
                <br/>
        </div>
        
    )
}

export default DropDeepForm
