import React from 'react';
import Post from '../Post';
import {db,storage} from './../../firebase/firebaseConfig';
import { useContext, useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { indigo } from '@mui/material/colors';

import './rightbar.css';
const Rightbar = () => {
    const [rtData, setRTData] =  useState([])
    const [show, setShow] =  useState(true)
    const [count, setCount] =  useState(0)

    async function  loadDataRT(){
        const suscriber = await db.collection('Post').orderBy("fechaPublicacion", "desc").onSnapshot(querySnapshot =>{
            const posts = []
            let cuenta =0;
            querySnapshot.forEach(documentSnapshot => {
                posts.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            });
            posts?.forEach((post)=>{
                if(post.rol =='Administrador'){
                cuenta++
                }
            })
            setCount(cuenta)
            setRTData(posts);
        })
        return () => suscriber()
    }

    useEffect(()=>{
        loadDataRT()
    },[])
    const showPost =()=>{
        setCount(count);
    }
    return (
        <div className="drawerRight">
            <p className="letrasright">
                {console.log(rtData)}
                <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                ><IconButton style={{backgroundColor: indigo[500], borderRadius: 50 ,width:'60px'}}
                        
                        >   
                        { rtData?
                         <Badge color="secondary" badgeContent={count} max={10}>
                        <MailIcon sx={{ fontSize: 40 }}/>
                        </Badge>
                        :<div></div>}
                        
                    </IconButton>
                </Grid>
                {show?
                 rtData?.map(function (post) {
                    console.log(post)
                    if(post.rol =='Administrador'){
                    return(
                        <Post key={post.id} data={post} />)
                    }
                }):<div></div>
                }
               
            </p>
        </div>
    )                                       
}

export default Rightbar
