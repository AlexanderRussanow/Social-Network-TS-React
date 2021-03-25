import usersReducer, { actions, InitialStateType } from "./users-Reducers";

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Dimych",
        followed: false,
        photos: { small: null, large: null },
        status: "hahahah",
      },
      {
        id: 1,
        name: "ghghhg",
        followed: true,
        photos: { small: null, large: null },
        status: "fds52",
      },
      {
        id: 2,
        name: "fdfdf",
        followed: false,
        photos: { small: null, large: null },
        status: "23454325",
      },
      {
        id: 3,
        name: "wrw",
        followed: false,
        photos: { small: null, large: null },
        status: "haha52345hah",
      },
      {
        id: 4,
        name: "ikiuk",
        followed: true,
        photos: { small: null, large: null },
        status: "gdsfg",
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
  };
});

test("following success", () => {
  const newState = usersReducer(state, actions.followSuccess(3));
  expect(newState.users[2].followed).toBeFalsy();
  expect(newState.users[3].followed).toBeTruthy();
});

test("unfollowing success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(4));
  expect(newState.users[1].followed).toBeTruthy();
  expect(newState.users[4].followed).toBeFalsy();
});
