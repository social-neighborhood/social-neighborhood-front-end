import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Rightbar from '../../Components/Rightbar';
import {useParams} from 'react-router';
import React,{useState,useEffect} from 'react'
import { Users } from "../../testData";
import './resident.css';

const ResidentDashboard = () => {
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [section, setSection] = useState('Feed');
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
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
        <div className="residentContainer">
            <Leftbar user={user} changeSection={changeSection}/>
            <Feed/>
            <Rightbar/>
        </div>
    )
}

export default ResidentDashboard;
