import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from "sweetalert2";
import { getRadioUtilityClass } from "@mui/material";
import { getTypeByValue } from "@mui/utils/integerPropType";

const DropFormConjunto2 = ({param,param2,param3,param4,
                    location,location2,location3,
                    onChange,enableSubmit,submited,
                    currentConjunto,currentUsuario,currentVivienda,
                    submiting,needNumber,
                    level}) => {
    const [datas,setDatas] = useState([]);
    const [datas2,setDatas2] = useState([]);
    const [current,setCurrent] = useState({
        idItem:'',
        nmbreItem:'',
        nItem:''
    });

    const [loading,setIsloading] =useState(false);
    const [enablesubmit2,sertenablesubmit2] =useState(false);
        const daticos =[]
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
    const ayuda=(res,currentstr)=>{
        axios.all(res?.map(function(result){
            let str = result.idTipoAgrupacion?result.idTipoAgrupacion:result.idtipoagrupacionconjunto?result.idtipoagrupacionconjunto+`/`+currentstr:result.idTipoInmueble
            return axios.get(window.$dir+location2+`/`+ param3+`/`+ str)
            .then(function(response){
                console.log(response.data)
                if(level && level==2){
                    console.log("level2:")
                    console.log(window.$dir+location3+`/`+ param4+`/`+ response.data.idTipoAgrupacion)
                    return  axios.get(window.$dir+location3+`/`+ param4+`/`+ response.data.idTipoAgrupacion)
                    .then(function(response){
                        return  response.data
                    });
                }
                else return response.data
            });
        })).then(function(lista){
            console.log(lista)
            setIsloading(false)
            setDatas2(lista)
        })
    }
    const fetchData = useCallback(async () => {
        setIsloading(true)
        let currentstr = getStringDataLocation();
        await axios.get(window.$dir+location+`/`+ param+`/`+ currentstr
        )
        .then( (res) =>{ 
            if(level>=1)ayuda(res.data,currentstr)
            setDatas(res.data)

        }).catch(
            e =>{console.log("Error: :c "+e)}
        )
    },[param])

    
useEffect(()=>{
    fetchData()
},[fetchData])

const handleOnChange = (name, value) => {
    submited(current)
    setCurrent({
        ...current,[name]:value
    });
    console.log(name)
    console.log(value)
    console.log(current)
  };
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsloading(true)
        let body ={}
        let body2 ={}
        if (param2 = "newAgrupacion")
            body={
                idtipoagrupacionconjunto:current.idItem,
                numero:current.nItem}
        let currentstr = getStringDataLocation();
        axios.post(window.$dir+location+`/`+ param2, body)
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
                    } });
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
                <Box component="form" onSubmit={handleSubmit} noValidate> 
                <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >   
                    <Grid item xs={8} > 
                        {datas2?.length!=0?
                            <TextField variant="outlined" id="select" label={param} select required fullWidth
                                 >
                                    { 
                                    datas2?.map((e,index)=>{
                                            console.log(e)
                                            return(
                                            <MenuItem id={datas[index].id? datas[index].id:e?.id} 
                                            key ={datas[index].id? datas[index].id:e?.id}
                                            name={datas[index].numero? e?.nombre +" "+ datas[index].numero:e?.nombre } 
                                            value={datas[index].numero? e?.nombre +" "+ datas[index].numero:e?.nombre } 
                                            onClick={event=>{handleOnChange("idItem",e?.id)
                                                            }}
                                            >
                                            {datas[index].numero? e?.nombre +" "+ datas[index].numero:e?.nombre } 
                                            </MenuItem>  )
                                    })  
                                }
                        </TextField>
                         :<LoadingButton loading  variant="outlined"></LoadingButton>
                        }
                    </Grid>
                    {
                    (!needNumber)?
                    <Grid item xs={4}> 
                        <TextField
                            required
                            id="nItem"
                            name="nItem"
                            label="#"
                            variant="outlined"
                            onChange={e=> handleOnChange("nItem",e.target.value)}
                        />
                    </Grid>:<div></div>
                    }
                </Grid>
                {
                    enableSubmit?
                    <Box textAlign='center'>
                        {
                            (current.idItem!='' && current.nItem!='' && !loading) ?
                            <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                            :<div></div>
                        }{
                            loading?
                            <LoadingButton loading loadingPosition="start" startIcon={<CircularProgress size={14} />} variant="outlined">Loading..</LoadingButton>
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

export default DropFormConjunto2
