import React from "react";
import s from "./post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://s.playgrnd.media/media/b404989fd35a210ff3ae0bcb0dd98c47b.jpg?w=500&h=500&v=30&dpr=2&fm=webp" />
      {props.message}
      <div>
        <span>like</span>
        {props.likeCount}
      </div>
    </div>
  );
};

export default Post;
