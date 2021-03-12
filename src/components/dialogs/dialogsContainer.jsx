import React from "react";
import {
  sendMessageActionCreator,
} from "../../redux/dialogs-Reducer";
import { connect } from "react-redux";
import Dialogs from "./dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapSatetToProps = (state) => {
  return {
    dialogPage: state.dialogPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessageCreator: (newMessageBody) => {
      dispatch(sendMessageActionCreator(newMessageBody));
    },
  };
};

export default compose(
  connect(mapSatetToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
