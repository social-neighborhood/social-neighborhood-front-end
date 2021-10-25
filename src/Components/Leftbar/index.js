import "./leftbar.css";
import React,{useState,useEffect} from 'react'
import Avatar from '@mui/material/Avatar';

import Divider from '@material-ui/core/Divider';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


import {
  Bookmark
} from "@material-ui/icons";
import { ThemeContext } from "styled-components";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});


export default function Leftbar({user,changeSection,conjunto,vivienda}) {
  return (
    <div className="drawer" >
      <div className={styles.toolbar} />
      <Divider />
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Avatar
            alt={user.nombres}
            src={user.profilePicture}
            sx={{ width: 156, height: 156 }}
          />
          <div className="profileInfo">
              <h4 className="profileInfoName">{user.nombres+" "+user.apellidos}</h4>
              <p className="profileInfoDesc">{user.email}</p>
              <p className="profileInfoDesc">{user.rol}</p>
              {/* <p className="profileInfoDesc">Conjunto: {conjunto.nombre}</p> */}
              {
                user.rol =="Administrador"?
                <p className="profileInfoDesc">Conjunto: el bosque</p>
                :
                <p className="profileInfoDesc">Vivienda: torre 5 apartamento 24</p>
              }
          </div>
          <Divider />
          <MenuList>
            {user.rol=="Administrador"?
              <div>
                <MenuItem name="CrearUsuario" className="crearUsuario" onClick={changeSection('crearUsuario') }>
                  <ListItemIcon><Bookmark className="sidebarIcon"/> </ListItemIcon>
                  <ListItemText>CrearUsuario</ListItemText>
                </MenuItem>
                <MenuItem name="Conjuntos" className="Conjuntos" onClick={changeSection('Conjuntos') }>
                  <ListItemIcon><Bookmark className="sidebarIcon"/> </ListItemIcon>
                  <ListItemText>Conjuntos</ListItemText>
                </MenuItem>
                <MenuItem name="ConfigurarConjuntos" className="ConfigurarConjuntos" onClick={changeSection('ConfigurarConjuntos') }>
                  <ListItemIcon><Bookmark className="sidebarIcon"/> </ListItemIcon>
                  <ListItemText>Config. Conjuntos</ListItemText>
                </MenuItem>
                <MenuItem name="EditarUsuario" className="EditarUsuario" onClick={changeSection('EditarUsuario') }>
                  <ListItemIcon><Bookmark className="sidebarIcon"/> </ListItemIcon>
                  <ListItemText>EditarUsuario</ListItemText>
                </MenuItem>
              </div>
              :
              <div></div>
            }
            <MenuItem value="dd" name="CrearUsuario" className="crearUsuario" onClick={changeSection('Feed') }>
              <ListItemIcon><Bookmark className="sidebarIcon"/> </ListItemIcon>
              <ListItemText>Feed</ListItemText>
            </MenuItem>
          </MenuList>          
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}