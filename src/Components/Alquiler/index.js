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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Swal from "sweetalert2";
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';

const defaultState = {
        tipoAgrupacion: {},
        tipoInmueble: {}
    }
const Alquiler = ({conjunto,user,vivienda,isEnabled,handleClose}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const [current,setCurrent] = useState({
    idZonaComun:0
});
const handleOnChange = (value) => {
    console.log(value)
    setCurrent({
        ...current,idZonaComun:value
    });
    console.log(current)
  };
const getStringDataLocation =()=>{
    let str =''
    user?.tipoUsuario == 'Residente' ? 
    str = vivienda.idconjunto+`/`+user.id+`/`+vivienda.idunidaddevivienda
    : str = conjunto.idconjunto+`/`+conjunto.idusuarioadministrador+`/`+conjunto.id
    return str;
}
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body={
        idZonaComun:current.idZonaComun,
        idConjunto: conjunto.idconjunto,
        tiempoAlquilerCobro: data.get('tiempoAlquiler'),
        costoAlquiler: data.get('costoAlquiler'),
        Disponible: data.get('row-radio-buttons-group'),
        tiempodeespera: data.get('tiempoEspera'),
        tiempomaximoalquiler: data.get('tiempoMaximo')
    }
    console.log(data);
    console.log(body);
    let currentstr = getStringDataLocation();
    axios.post(window.$dir+`admin`+`/`+ `newzonaComunConjunto`+`/`+ currentstr, body)
    .then( function (response) {
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
        Swal.fire(
            'Actualizado correctamente',
            'success'
            ).then((result) => {
                if (result.isConfirmed) {
                } });
        } else {
        Swal.fire("Something is Wrong :(!", "try again later", "error");
        }                                                               
    })
    .catch(function (errorx) {
        Swal.fire("Esta zona comun ya existe! :(!", "intenta con otra  zona de tu conjunto", "error");
    });
};
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
        <Dialog open={isEnabled} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle id="responsive-dialog-title"> {"Alquilar"} </DialogTitle>   
        <DialogContent> 
            <DialogContentText>
                Que deseas alquilar? recuerda compartir este evento con tus amigos del conjunto!
            </DialogContentText>
            <Box sx={{  flexGrow: 1 }} >
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={6}>
                    <Paper >  
                            <img
                                src="/pool.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={6} > 
                    <DropForm param='zonaComun'
                        currentConjunto ={conjunto} currentUsuario={user} 
                        location='admin' enableSubmit={false} submited={handleOnChange} isenable={true}/>
                    <TextField
                        required
                        id="inicioAlquiler"
                        name="inicioAlquiler"
                        variant="outlined"
                        type="datetime-local"
                    />
                     <TextField
                        required
                        id="finAlquiler"
                        name="finAlquiler"
                        variant="outlined"
                        type="datetime-local"
                    />
                    <TextField
                        disabled
                        id="costoAlquiler"
                        name="costoAlquiler"
                        label="costo de Alquiler"
                        variant="outlined"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}    
                        value = "145000"  
                    />
                </Grid>
            </Grid>
            <br/>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Aceptar 
                </Button>
                <Button onClick={handleClose} autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
            </Box>
        </DialogContent> 
        </Dialog>
    )
    }    
export default Alquiler
