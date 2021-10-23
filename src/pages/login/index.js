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

import axios from 'axios';
import {Users} from '../../testData';
const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    let history = useHistory();

    const [values, setValues] = useState({
        loginConfirm: true,
        user: '',
        password: '',
        rol: 'Administrador',
        vivienda:''
      });
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
        console.log(values);
      };

    const [showPassword,setShowPassword] = useState(false);
    const toggleShowPassword =()=>{
        setShowPassword(!showPassword);
    }
    const [dashboard,setDashboard] = useState('Administrador');
    const toggleDashboard =(e)=>{
        values.rol=e.target.value;
        setDashboard(e.target.value);
    }

    const [residencia,setResidencia] = useState('vivienda');
    const toggleResidencia =(e)=>{
        setResidencia(e.target.value);
    }

    const [currentUserData,SetCurrentUserData] = useState({});
    const handleUser = e =>{
        const { name, value } = e.target;     
        //hacer solicitud al back del usuario actual
        if (values.user && values.user!=''){
            axios.get(`https://socialneighborhood.herokuapp.com/userByEmail/` + values.user
            ).then(res =>{
                console.log("this is the answer "+res)
            })
        }
        const currentData = Users.find((data) => (
            data.userMail === value
          ));
        if(currentData!=null)values.rol = currentData.rol
        SetCurrentUserData(currentData)
        handleChange(e)
    }

    const handleSubmit =  e => {
        e.preventDefault();
        console.log(values);
        if (values.rol && values.user && values.password) {
            if (currentUserData.rol === 'Administrador') {
                history.push('/adminDashboard/'+currentUserData.user);
            } else {
                history.push('/residentDashboard/'+currentUserData.user);
            }
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
                                value={values.user}
                                onChange={handleUser} fullWidth autoFocus required />
                        </div>
                        <br></br>
                        <div >
                            <FormControl className="" variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput fullWidth label="Password"
                                    id="outlined-adornment-password-login"
                                    type={showPassword? 'text' : 'password'}
                                    value={values.password}
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
                        <div></div>
                        :
                        <div>
                        {values.rol==='Residente' && currentUserData?
                            <div>
                                <TextField variant="outlined" id="select" label="Vivienda" select required fullWidth
                                    onChange={toggleResidencia} value={residencia}>
                                        {currentUserData.residencias?.map((residencia)=>{
                                            return (
                                                <MenuItem id={residencia}
                                                        name="vivienda" 
                                                        value={residencia}
                                                        onChange={handleChange}
                                                        >
                                                    {residencia}
                                                </MenuItem>      
                                            )                 
                                        })
                                        }
                                </TextField>
                            </div>
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