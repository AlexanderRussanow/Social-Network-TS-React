import React, { PureComponent } from "react";
import { reduxForm, Field } from "redux-form";
import {
  maxLengthCreator,
  minLengthCreator,
  required,
} from "../../../utils/validators/validarot";
import { TextArea } from "../../common/formControls/formControls";
import s from "./MyPosts.module.css";
import Post from "./post/post";

const maxLengthCreator10 = maxLengthCreator(10); //for initialization
const minLengthCreator2 = minLengthCreator(2);

const AddNewPostForm = (props) => {   //the real form
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="newPostText"
          component={TextArea}
          validate={[required, maxLengthCreator10, minLengthCreator2]}
          placeholder="type your message here..."
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
  AddNewPostForm    //redux packing
);

const MyPosts = React.memo((props) => {      // jsx element 
  let postsElements = props.postData.map((p) => (
    <Post message={p.message} likeCount={p.like} />
  ));

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postBlock}>
      <h3>my post</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;

