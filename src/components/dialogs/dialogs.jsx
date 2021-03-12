import React from "react";
import DialogItem from "./dialogItem/dialogItems";
import Message from "./dialogMessage/dialogsMessages";
import s from "./dialogs.module.css";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../common/formControls/formControls";
import { maxLengthCreator, required } from "../../utils/validators/validarot";

const maxLengthCreator100 = maxLengthCreator(100)

const Dialogs = (props) => {
  let state = props.dialogPage;

  let messageElements = state.messageText.map((t) => (
    <Message text={t.message} />
  ));

  let dialogsElements = state.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));


  let addNewMessage = (values) => {
    props.sendMessageCreator(values.newMessageBody)    
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

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={TextArea}
        validate={[required, maxLengthCreator100]}
        name={"newMessageBody"}
        placeholder={"enter your messge"}
      />
      <div>
        <button>Send...</button>
      </div>
    </form>
  );
};

const ReduxAddMessageForm = reduxForm({
  form: "addMessage",
})(AddMessageForm);

export default Dialogs;
