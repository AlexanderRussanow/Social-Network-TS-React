import React from "react";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/profileInfo";


type PropsType = {
  profile: ProfileType |  null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        profile={props.profile}
        isOwner={props.isOwner}
        status={props.status}
        updateStatus={props.updateStatus}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
