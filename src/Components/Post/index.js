import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">            
              <img
                className="postProfileImg"
                src={
                  ""
                }
                alt=""
              />
            <span className="postUsername">NombreAutor</span>
            <span className="postDate">Feha de publicacion</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Datos de la publicacion</span>
          <img className="postImg" src="" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <span className="postLikeCounter">Likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">comentarios</span>
          </div>
        </div>
      </div>
    </div>
  );
}