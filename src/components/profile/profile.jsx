import React from "react";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/profileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        profile={props.profile}
        isOwner={props.isOwner}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
