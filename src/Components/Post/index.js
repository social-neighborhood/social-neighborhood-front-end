import "./post.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grow from '@mui/material/Grow';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Post({data}) {
  return (
   <div className="card_post">
       <Grow in={true} style={{timeout: 500}}>
      <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            JP
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.nombreUsuario+' '+data.apellidoUsuario}
        subheader={new Intl.DateTimeFormat('en-US', 
                {year: 'numeric', month: '2-digit',day: '2-digit', 
                hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data.fechaPublicacion)}
      />
      <CardMedia
        component="img"
        height="194"
        image={data.imagen}
        alt="asado"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.texto}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
    </Grow>
   </div>
  );
} 