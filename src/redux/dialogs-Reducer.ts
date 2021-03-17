const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number;
  name: string;
};

type MessageTextType = {
  id: number;
  message: string;
};

let initialState = {
  dialogsData: [
    { id: 1, name: "Alex" },
    { id: 2, name: "Dimych" },
    { id: 3, name: "Andrey" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Stas" },
    { id: 6, name: "Viktor" },
    { id: 7, name: "Yulja" },
  ] as Array<DialogType>,

  messageText: [
    { id: 1, message: "Hi" },
    { id: 2, message: "Hello" },
    { id: 3, message: "Hallo, wie gehts?" },
    { id: 4, message: "Hallo, wie gehts?" },
    { id: 5, message: "Hallo, wie gehts?" },
    { id: 6, message: "Hallo, wie gehts?" },
    { id: 7, message: "Hallo, wie gehts?" },
  ] as Array<MessageTextType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messageText: [...state.messageText, { id: 8, message: body }] 
      };
    default:
      return state;
  }
};

type SendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageActionCreator = (
  newMessageBody: string
): SendMessageActionCreatorType => {
  return {
    type: SEND_MESSAGE,
    newMessageBody,
  };
};

export default dialogsReducer;
