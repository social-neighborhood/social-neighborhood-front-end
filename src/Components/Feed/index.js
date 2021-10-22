import { useContext, useEffect, useState } from "react";
import Post from "../Post";
import "./feed.css";

const Feed = () => {
    return (
    <div className="feed">
        <div className="feedWrapper">
            <Post />
        </div>
    </div>
    )
}

export default Feed
