import React from "react";
import {
  actions
} from "../../redux/dialogs-Reducer";
import { connect } from "react-redux";
import Dialogs from "./dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

let mapSatetToProps = (state: AppStateType) => {
  return {
    dialogPage: state.dialogPage,
  };
};

export default compose<React.ComponentType>(
  connect(mapSatetToProps, {...actions}),
  withAuthRedirect
)(Dialogs)





// let mapDispatchToProps = (dispatch) => { // - Old tip how to create MapStateToDispatch with call back function
//   return {
//     sendMessageCreator: (newMessageBody: ) => {
//       dispatch(actions.sendMessage(newMessageBody));
//     },
//   };
// };
