import React from "react";
import Preloader from "../../common/preloader/preloader";
import s from "./ProfileInfo.module.css";
import ava from './../../assets/images/ava_new.jpg'
import ProfileStatusWithHooks from "./ProfileStatusHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img className={s.photo} src={profile.photos.large || ava} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        <div></div>
        <h2>{profile.fullName}</h2>
        <h3>page ID: {profile.userId}</h3>
        <div></div>
        <div>{profile.aboutMe || 'About me: '}</div>
        <div>{profile.contacts.instagram || 'Instagram: '}</div>
        <div>{profile.contacts.vk || 'Vk: '}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
