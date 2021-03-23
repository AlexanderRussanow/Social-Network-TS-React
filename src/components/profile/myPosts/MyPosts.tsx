import React, { PureComponent } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { PostDataType } from "../../../types/types";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../../utils/validators/validarot";
import { createField, TextArea } from "../../common/formControls/formControls";
import s from "./MyPosts.module.css";
import Post from "./post/post";

const maxLengthCreator10 = maxLengthCreator(10); //for initialization
const minLengthCreator2 = minLengthCreator(2);

type PropsType = {}

type AddPostFormValuesType = {
  newPostText: string
}
type AddPostFormValuesTypeKeys = Extract<keyof AddPostFormValuesType, string>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {   //the real form
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField <AddPostFormValuesTypeKeys>("type your message here...", "newPostText", [required, maxLengthCreator10, minLengthCreator2], TextArea)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({ form: "profileAddNewPostForm" })(
  AddNewPostForm    //redux packing
);

export type MapMyPostsType = {
  postData: Array<PostDataType>
}

export type DispatchMyPostsType = {
  addPost: (newPostText: string) => void
}

const MyPostsForMemo: React.FC<MapMyPostsType & DispatchMyPostsType> = (props) => {      
  let postsElements = props.postData.map(p => (
    <Post message={p.message} likeCount={p.like} />
  ));

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postBlock}>
      <h3>my post</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};


const MyPosts = React.memo(MyPostsForMemo)

export default MyPosts;

