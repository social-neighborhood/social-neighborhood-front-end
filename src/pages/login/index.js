import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link,MenuItem } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Swal from 'sweetalert2';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import DropForm from '../../Components/Conjuntos/DropForm';
import axios from 'axios';
import {Users} from '../../testData';
const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    let history = useHistory();

    const handleChange2 = e => {
        const {id, value } = e.target;
        currentUserData?.rol==="Administrador"?
        setCurrentConjuntoData({"id": id,"nombre":value})
        :
        setCurrentViviendaData({"id": id,"nombre":value})
        console.log(currentConjuntoData);
      };
    const handleChange = e => {
        const {name, value } = e.target;
    };

    const [showPassword,setShowPassword] = useState(false);
    const toggleShowPassword =()=>{
        setShowPassword(!showPassword);
    }
    const [dashboard,setDashboard] = useState('Administrador');

    const [residencia,setResidencia] = useState('vivienda');
    const toggleResidencia =(e)=>{
        setResidencia(e.target.value);
    }
    const[currentUserData,setCurrentUserData] =useState(null)
    const[currentConjuntoData,setCurrentConjuntoData] =useState({id:"1",nombre:"el bosque"})
    const[currentViviendaData,setCurrentViviendaData] =useState({id:"1",nombre:"casa26"})

    const sendCache =(rol)=>{
        const body={}
        let url=''
        if(rol =="Administrador")
            url =`http://localhost:8080/social/autorizado/`+currentConjuntoData.id+`/`+currentUserData.id+`/0/0/0`
        else url =`http://localhost:8080/social/autorizado/null/`+currentUserData.id+`/null/`+currentViviendaData.id+`/null`
        axios.post(url, body).then( function (response) {
            console.log(response.status);
            console.log(response.data);
            console.log(response);
            if (response.status === 200) {
            Swal.fire(
                'Youre logged',
                'success'
            )
            } else {
            Swal.fire("Something is Wrong :(!", "try again later", "error");
            //history.push("/login");
            }
        })
        .catch(function (errorx) {
            Swal.fire(""+errorx, "try again later", "error");
            //history.push("/login");
        });
    }
    const handleUser = (e) =>{
        const { name, value } = e.target;
        //hacer solicitud al back del usuario actual
        if (value){
            axios.get(`http://localhost:8080/social/userByEmail/` + value
            ).then(res =>{
                    const dat = res.data
                    setCurrentUserData(dat)
                    setCurrentUserData({...dat,rol:"Administrador",
                        profilePicture:"/people/avatar1.png",
                        nameConjunto:"pinar"
                    })
                    console.log(currentUserData.email)
            }).catch(
                e =>{console.log("Error: :c "+e)}
            )
        }
    }
    const  handleSubmit = (e) => {        
        console.log(currentUserData)
        e.preventDefault();
        let redirect =''
        localStorage.setItem('user', JSON.stringify(currentUserData));
        currentUserData.rol=="Administrador"?
        localStorage.setItem('conjunto', JSON.stringify(currentConjuntoData)):
        localStorage.setItem('Vivienda', JSON.stringify(currentViviendaData))
        sendCache(currentUserData.rol);
        if (currentUserData.rol && currentUserData.nombres && currentUserData.password) {
            if (currentUserData.rol === 'Administrador') {
                redirect='/adminDashboard/'
            } else {
              redirect='/residentDashboard/'
            }                                                                                                                                                                                                                                                                                                                       
            console.log(redirect)
            history.push(redirect);
        }
    };

    return(
        <Grid>
            <form onSubmit={handleSubmit} className="" >
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Iniciar Sesion</h2>
                    </Grid>
                    <div className="text login">
                        <div>
                            <TextField variant="outlined" id="user" name="user" label="Username" type="email"
                                value={currentUserData?.email}
                                onChange={handleUser} fullWidth autoFocus required />
                        </div>
                        <br></br>
                        <div >
                            <FormControl className="" variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput fullWidth label="Password"
                                    id="outlined-adornment-password-login"
                                    type={showPassword? 'text' : 'password'}
                                    name="password"
                                    autoComplete="off"
                                    onChange={handleChange}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={toggleShowPassword}
                                                edge="end"
                                                name = "showPassword"
                                                id = "showPassword"
                                            >
                                                {showPassword? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                        </div >
                        <br></br>
                        <br></br>
                        {currentUserData?.rol==="Administrador"?
                            <DropForm param={'conjuntosByEmail/'+currentUserData?.email} location='social' enableSubmit={false} onChange={handleChange2}/>
                            :
                        <div>
                            {currentUserData?.rol==='Residente' ?
                            <DropForm param={'getUnidadDeViviendaByEmail/'+currentUserData?.email} location='social' enableSubmit={false} onChange={handleChange2}/>
                            :
                            <div></div>
                            }
                        </div>
                        }
                        <br></br>
                    </div>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </Paper>
            </form>
        </Grid>
    )
}

export default Login