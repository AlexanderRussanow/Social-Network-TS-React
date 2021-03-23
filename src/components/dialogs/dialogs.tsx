import React from "react";
import DialogItem from "./dialogItem/dialogItems";
import Message from "./dialogMessage/dialogsMessages";
import s from "./dialogs.module.css";
import { Field, reduxForm } from "redux-form";
import { createField, TextArea } from "../common/formControls/formControls";
import { maxLengthCreator, required } from "../../utils/validators/validarot";
import { InitialStateType } from "../../redux/dialogs-Reducer";
import { Redirect } from "react-router";
import { InjectedFormProps } from "redux-form";

const maxLengthCreator100 = maxLengthCreator(100)

type DialogsPropsType = {
  dialogPage: InitialStateType
  sendMessage: (messageText: string) => void
 
}

type NewMessageFormValuesType = {
  email: string,
   password: string, 
   rememberMe: boolean, 
   newMessageBody: string
}

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  let state = props.dialogPage;

  let messageElements = state.messageText.map((t) => (
    <Message text={t.message} />
  ));

  let dialogsElements = state.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));


  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody)    
  };


  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsElements}</div>
        <div className={s.messages}>
          <div>{messageElements}</div>
          <div>
            <ReduxAddMessageForm onSubmit={addNewMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
            {createField<NewMessageFormValuesTypeKeys>("enter your message", "newMessageBody", [required, maxLengthCreator100], TextArea)}

  
      <div>
        <button>Send...</button>
      </div>
    </form>
  );
};

const ReduxAddMessageForm = reduxForm<NewMessageFormValuesType>({
  form: "addMessage",
})(AddMessageForm);

export default Dialogs;
