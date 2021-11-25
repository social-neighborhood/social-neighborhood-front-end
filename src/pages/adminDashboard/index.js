import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Conjuntos from '../../Components/Conjuntos';
import RegisterUser from  '../../Components/RegisterUser';
import Rightbar from '../../Components/Rightbar';
import {useParams} from 'react-router';
import React,{useState,useEffect,useRef} from 'react'
import { Users } from "../../testData";
import './admin.css';
import ConfigurarConjuntos from '../../Components/ConfigurarConjuntos';
import EditarUsuario from '../../Components/EditarUsuario';

import axios from 'axios';
import Swal from "sweetalert2";
import zonasComunes from '../../Components/ZonasComunes';
import ZonasComunes from '../../Components/ZonasComunes';
import Alquiler from '../../Components/Alquiler';
const AdminDashboard = () => {
    const [user, setUser] = useState({});
    const [section, setSection] = useState('Feed');
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [currentConjunto,setCurrentConjunto] = useState(JSON.parse(localStorage.getItem('conjunto')));
    const [currentVivienda,setCurrentVivienda] = useState(JSON.parse(localStorage.getItem('vivienda')));
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
     }
    const switchSection = (param) =>{
        switch(param) {
            case 'crearUsuario':
              return <RegisterUser/>;
            case 'Conjuntos':
                return <Conjuntos user={currentUser} conjunto={currentConjunto}/>;
            case 'Feed':
                    return <Feed user={currentUser} conjunto={currentConjunto}/>;
            case 'ConfigurarConjuntos':
                return <ConfigurarConjuntos user={currentUser} conjunto={currentConjunto}/>;
            case 'EditarUsuario':
                return <EditarUsuario  user={currentUser} conjunto={currentConjunto}/>;
            case 'ZonasComunes':
                return <ZonasComunes  user={currentUser} conjunto={currentConjunto}/>;
            default:
              return <Feed user={currentUser} conjunto={currentConjunto}/>;
          }
     }
    useEffect(() => {
        const fetchUser = async () => {
        if (!currentUser) {
            await Swal.fire(
                'No está autentificado',
                'Por favor inicie sesion para usar esta funcionalidad',
                'error'
            )
            // eliminar localStorage
            localStorage.clear();
            // redireccionar a login
            window.location.replace("/login")
        }
        //const res = await axios.get(`/users?username=${username}`);
        console.log("current-------User")
        console.log(currentConjunto)
        console.log(currentUser)
        console.log("currentassssssssssssdasdUser")
        console.log(currentVivienda)
        console.log("currentasdasdUser")

        }
        fetchUser();
    },[]);
    return (
        <div className="adminContainer">
            <Leftbar user={currentUser} conjunto={currentConjunto} changeSection={changeSection}/>
            {switchSection(section)
            }
            <Rightbar/>   
        </div>
    )
}

export default AdminDashboard;
