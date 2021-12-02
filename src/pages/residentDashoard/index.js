import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Rightbar from '../../Components/Rightbar';
import Home from '../home'
import {useParams} from 'react-router';
import React,{useState,useEffect} from 'react'
import { Users } from "../../testData";
import Swal from "sweetalert2";
import './resident.css';
import Alquiler from '../../Components/Alquiler';
import { Panorama } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const ResidentDashboard = () => {
    let history = useHistory();
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [currentConjunto,setCurrentConjunto] = useState(JSON.parse(localStorage.getItem('conjunto')));
    const [currentVivienda,setCurrentVivienda] = useState(JSON.parse(localStorage.getItem('vivienda')));

    const [section, setSection] = useState('Feed');
    const changeSection = some => () =>{
        console.log(section)
        if(some ==='Alquiler')handleClickOpen()
        setSection(some)
     }

     const [open, setOpen] = useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
     const switchSection = (param) =>{
        switch(param) {
            case 'Feed':
                return <Feed user={currentUser} conjunto={currentConjunto}/>;
            case 'Exit':
                history.push("/");
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
        console.log(currentUser)
        console.log(currentVivienda)
        console.log(currentConjunto)

        }
        fetchUser();
    },[]);

    return (
        <div className="residentContainer">
            <Leftbar   user={currentUser} vivienda={currentVivienda} changeSection={changeSection}/>
            <div className="leftabsolute">
                <Alquiler  user={currentUser} vivienda={currentVivienda} conjunto={currentConjunto} isEnabled={open} handleClose={handleClose}/>

                {switchSection(section)
                 }
            </div>
            <div className="rightabsolute">
                <Rightbar/>
            </div>
        </div>
    )
}

export default ResidentDashboard;
