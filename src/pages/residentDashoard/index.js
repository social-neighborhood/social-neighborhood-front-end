import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Rightbar from '../../Components/Rightbar';
import {useParams} from 'react-router';
import React,{useState,useEffect} from 'react'
import { Users } from "../../testData";


const ResidentDashboard = () => {
    const [user, setUser] = useState({});
    const username = useParams().username;

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
        <>
        <Leftbar user={user}/>
        <Feed/>
        <Rightbar/>
        </>
    )
}

export default ResidentDashboard;
