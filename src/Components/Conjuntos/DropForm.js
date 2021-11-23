import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from "sweetalert2";
import { getRadioUtilityClass } from "@mui/material";

const defaultState = {
    ans:''
};

const DropForm = ({param,param2,param3,
                    location,location2,
                    onChange,enableSubmit,submited,isenable,
                    currentConjunto,currentUsuario,currentVivienda,
                    level}) => {
    const [datas,setDatas] = useState([]);
    const [currentItem,setCurrentItem] = useState(0);
    const [datas2,setDatas2] = useState([]);
    const [loading,setIsloading] =useState(false);
    const [enablesubmit2,sertenablesubmit2] =useState(false);

    const getStringDataLocation =()=>{
        let str =''

        currentUsuario?.tipoUsuario == 'Residente' ? 
        str = currentVivienda.idconjunto+`/`+currentUsuario.id+`/`+currentVivienda.idunidaddevivienda
        : str = currentConjunto.idconjunto+`/`+currentConjunto.idusuarioadministrador+`/`+currentConjunto.id
        return str;
    }
    const Togglesubmit2 =()=>{
        sertenablesubmit2(true)
    }
    const fetchData = useCallback(async () => {
            let currentstr = getStringDataLocation();
            await axios.get(window.$dir+location+`/`+ param+`/`+ currentstr
            )
            .then( (res) =>{  setDatas(res.data)
            }).catch(
                e =>{console.log("Error: :c "+e)}
            )
        },[param])
    useEffect(()=>{
        fetchData()
    },[fetchData])
    const handleCurrentItem = (val) =>{
        setCurrentItem(val);
        if(isenable)submited(currentItem);
    }
    const handleSubmit = (event) => {
        Togglesubmit2(true)
        event.preventDefault();
        console.log(event.currentTarget)
        const data = new FormData(event.currentTarget);
        // // enviar datos al back
        setIsloading(true)
        let body ={}
        if (param2 == "newTipoAgrupacion")
            body={
                idconjunto:currentConjunto.idconjunto,
                idTipoAgrupacion:currentItem}
        if (param2 == "newInmueble")
            body={
            idconjunto:currentConjunto.idconjunto,
            idTipoInmueble: currentItem}
        let currentstr = getStringDataLocation();
        console.log(body)
        axios.post(window.$dir+location+`/`+ param2+`/`+ currentstr, body)
        .then( function (response) {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
            Swal.fire(
                'Actualizado correctamente',
                'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setIsloading(false)
                        submited()
                    } });
            } else {
            Swal.fire("Something is Wrong :(!", "try again later", "error");
            }                                                               
        })
        .catch(function (errorx) {
            setIsloading(false)
            Swal.fire("Este tipo ya existe en tu conjunto"+errorx, "Intenta con otro tipo", "error");
        });
    };
    return (
        <div>
                <div>
                <Box component="form" onSubmit={handleSubmit} noValidate> 
                {datas.length!=0?
                    <TextField variant="outlined" id="select" name="prueba2" label={param} select required fullWidth
                        onChange={Togglesubmit2} >
                            {
                            datas?.map((element)=>{
                                    return (
                                        <MenuItem id={element.id} 
                                                key ={element.id}
                                                name={element.nombre||element.nombres+' '+element.apellidos } 
                                                value={element.nombre||element.nombres+' '+element.apellidos } 
                                                onClick= {(e)=>{handleCurrentItem(element.id)}}
                                                >
                                            {element.nombre||element.nombres+' '+element.apellidos }
                                        </MenuItem>      
                                    )                 
                                })
                                
                            }
                </TextField>
                :<LoadingButton loading loadingPosition="start" variant="outlined">Loading..</LoadingButton>
                }
                {
                enableSubmit?
                <Box textAlign='center'>
                    {
                        loading || datas.length==0?
                        <LoadingButton loading loadingPosition="start" startIcon={<CircularProgress size={14} />} variant="outlined">Loading..</LoadingButton>
                        :
                        enablesubmit2?
                        <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                        :<div></div>
                    }
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
