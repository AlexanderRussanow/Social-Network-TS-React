import dialogsReducer from "./dialogs-Reducer"
import profileReducer from "./profile-Reducer"


let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 1, message: "Hi, how are you?", like: 23 },
                { id: 2, message: "this is my first try to make a post there", like: 2 },
                { id: 3, message: "Are any pretty puppy-girls there?", like: 3345 },
                { id: 4, message: "My name is Louygy or you can also call me Vinsy", like: 1 },
            ],

            newPostText: 'it-kamasutra.com',
        },
        dialogPage: {
            dialogsData: [
                { id: 1, name: "Alex" },
                { id: 2, name: "Dimych" },
                { id: 3, name: "Andrey" },
                { id: 4, name: "Sasha" },
                { id: 5, name: "Stas" },
                { id: 6, name: "Viktor" },
                { id: 7, name: "Yulja" },
            ],

            messageText: [
                { id: 1, message: "Hi" },
                { id: 2, message: "Hello" },
                { id: 3, message: "Hallo, wie gehts?" },
                { id: 4, message: "Hallo, wie gehts?" },
                { id: 5, message: "Hallo, wie gehts?" },
                { id: 6, message: "Hallo, wie gehts?" },
                { id: 7, message: "Hallo, wie gehts?" },
            ],
            newMessageBody: '',
        },
        sideBar: {},
    },
    _callSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)

        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)

        this._callSubscriber(this._state)

    }
}



export default store;
window.store = store
