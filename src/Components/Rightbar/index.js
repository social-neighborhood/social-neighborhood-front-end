import React from 'react';
import Post from '../Post';
import {db,storage} from './../../firebase/firebaseConfig';
import { useContext, useEffect, useState } from "react";

import './rightbar.css';
const Rightbar = () => {
    const [rtData, setRTData] =  useState([])
    const [loading, isLoading] =  useState(false)

    async function  loadDataRT(){
        const suscriber = await db.collection('Post').orderBy("fechaPublicacion", "desc").onSnapshot(querySnapshot =>{
            const posts = []
            querySnapshot.forEach(documentSnapshot => {
                posts.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            });
            setRTData(posts);
        })
        return () => suscriber()
    }

    useEffect(()=>{
        loadDataRT()
    },[])
    return (
        <div className="drawerRight">
            <p className="letrasright">
                {console.log(rtData)}
                {rtData?.map(function (post) {
                    console.log(post)
                    if(post.rol =='Administrador')
                    return(
                        <Post key={post.id} data={post} />)
                })}  
            </p>
        </div>
    )                                       
}

export default Rightbar
