import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";

const defaultState = [];
const DropForm = ({param,location,onChange,enableSubmit,param2,currentConjunto,submited}) => {
    const [data,setData]= useState([defaultState])
    const fetchData = useCallback(async () => {
            await axios.get(`https://socialneighborhood.herokuapp.com/`+location+`/`+ param
            ).then(res =>{           
                setData(res.data)
                console.log(data)
            }).catch(
                e =>{console.log("Error: :c "+e)}
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
                        {data?.map((element)=>{
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

export default DropForm
