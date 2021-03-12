import profileReducer, { addPostActionCreator, deletePost } from "./profile-Reducer";



let state = {
  postData: [
    { id: 1, message: "Hi, how are you?", like: 23 },
    { id: 2, message: "this is my first try to make a post there", like: 2 },
    { id: 3, message: "Are any pretty puppy-girls there?", like: 3345 },
    { id: 4, message: "My name is Louygy or you can also call me Vinsy", like: 1 },
  ]
};

it('length of posts should be incremented', () => {

  let action = addPostActionCreator("it-kamasutra.com")

  let newState = profileReducer(state, action)

  expect(newState.postData.length).toBe(5)

})



it('message of new post should be correct', () => {
// test data
  let action = addPostActionCreator("it-kamasutra.com")
// action
  let newState = profileReducer(state, action)
// expectation
  expect(newState.postData[4].message).toBe('it-kamasutra.com')

})

it('after deleting length of messages shgould be decremented', () => {
  let action = deletePost(1)

  let newState = profileReducer(state, action)

  expect(newState.postData.message).toBe(undefined)
}
)


