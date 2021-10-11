import "./leftbar.css";
import React,{useState,useEffect} from 'react'
import axios from "axios";
import {useParams} from 'react-router';
import img from '../../images/people.png';

import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
export default function Leftbar({user}) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <img
            src={
              user.profilePicture
            }
            alt=""
            className="topbarImg"
          />
          <div className="profileInfo">
              <h4 className="profileInfoName">{user.user}</h4>
              <span className="profileInfoDesc">{user.userMail}</span>
          </div>
          {user.rol=="Administrador"?
           <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">CrearUsuario</span>
            </li>
            :
            <></>
          }
           
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}