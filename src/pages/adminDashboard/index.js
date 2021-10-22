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

const AdminDashboard = () => {
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [section, setSection] = useState('Feed');
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
     }
    const switchSection = (param) =>{
        switch(param) {
            case 'crearUsuario':
              return <RegisterUser/>;
            case 'Conjuntos':
                return <Conjuntos/>;
            case 'Feed':
                    return <Feed/>;
            case 'ConfigurarConjuntos':
                return <ConfigurarConjuntos/>;
            case 'EditarUsuario':
                return <EditarUsuario/>;
            default:
              return <Feed/>;
          }
     }
    useEffect(() => {
        const fetchUser = async () => {
        //const res = await axios.get(`/users?username=${username}`);
        const currentUser = Users.find((data) => (
            data.user === username
        ));
        //setUser(res.data);
        setUser(currentUser);
        };
        fetchUser();
    }, [username]);

    

    return (
        <div className="adminContainer">
            <Leftbar user={user} changeSection={changeSection}/>
            {switchSection(section)
            }
            <Rightbar/>   
        </div>
    )
}

export default AdminDashboard;
