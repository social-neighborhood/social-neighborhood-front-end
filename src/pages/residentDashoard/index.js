import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Rightbar from '../../Components/Rightbar';
import {useParams} from 'react-router';
import React,{useState,useEffect} from 'react'
import { Users } from "../../testData";
import Swal from "sweetalert2";
import './resident.css';

const ResidentDashboard = () => {
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [currentVivienda,setCurrentVivienda] = useState(JSON.parse(localStorage.getItem('vivienda')));
    
    const [section, setSection] = useState('Feed');
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
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
        console.log(currentUser)
        console.log(currentVivienda)

        }
        fetchUser();
    },[]);

    return (
        <div className="residentContainer">
            <Leftbar user={currentUser} vivienda={currentVivienda} changeSection={changeSection}/>
            <Feed/>
            <Rightbar/>
        </div>
    )
}

export default ResidentDashboard;
