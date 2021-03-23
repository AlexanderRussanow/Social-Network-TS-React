import React from "react";
import s from "./../dialogs.module.css";

type PropsType = {
  text: string
}

const Message: React.FC<PropsType> = (props) => {
  return <div className={s.message}>{props.text}</div>;
};

export default Message;
