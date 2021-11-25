import { useContext, useEffect, useState } from "react";
import Post from "../Post";
import "./feed.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageIcon from '@mui/icons-material/Image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alquiler from "../Alquiler";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

import {useDate} from '../../useDate'

const Feed = ({user,conjunto}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const { date, time, wish } = useDate();

    return (
    <div className="feed">
        <div className="feedWrapper">
        <Card sx={{ width: 700}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[123] }} aria-label="recipe">
                    {user.nombres[0]+ ' '+ user.apellidos[0]}
                </Avatar>
                }
                title={user.nombres+ ' '+ user.apellidos}
            />
            {date}{time}
            <CardContent>
            <TextField
                        required fullWidth
                        id="inputPost"
                        name="inputPost"
                        label="What do you think?"
                        variant="outlined"
                    />
            </CardContent>
            <CardActions disableSpacing>
                <Button type="submit" variant="contained" color="info"endIcon={<ImageIcon />}>Upload image</Button>
                <Button type="submit" variant="contained" color="info" sx={{ ml: 50}}>Publish</Button>
             </CardActions>
        </Card>
        <Post />
        </div>
    </div>
    )
}

export default Feed
