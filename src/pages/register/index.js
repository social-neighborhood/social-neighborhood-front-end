import React from 'react'
import RegisterUser from "../../Components/RegisterUser"
import Grid from '@mui/material/Grid';
import "./register.css";
const Register = () => {
    return (
        <div className="register_box">
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <img src="./register.png" heigh="480px" width="480px">
                        </img>
                </Grid>
                <Grid item xs={4}>
                    <div className="some">
                        <RegisterUser />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register
