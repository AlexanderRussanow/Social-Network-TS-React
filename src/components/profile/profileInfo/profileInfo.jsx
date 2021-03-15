import React, { useState } from "react";
import Preloader from "../../common/preloader/preloader";
import s from "./ProfileInfo.module.css";
import ava from "./../../assets/images/ava_new.jpg";
import ProfileStatusWithHooks from "./ProfileStatusHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const oNMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
      }
    );
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img className={s.photo} src={profile.photos.large || ava} />
        {isOwner && (
          <div>
            <input type={"file"} onChange={oNMainPhotoSelected} />
          </div>
        )}
        <br></br>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        <br></br>
        <div>
          {editMode ? (
            <ProfileDataForm
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              toEditMode={() => {
                setEditMode(true);
              }}
              profile={profile}
              isOwner={isOwner}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
    return (
      <div>
        <b>{contactTitle}</b>
        <span> {contactValue} </span>
      </div>
    );
};

const ProfileData = ({ profile, isOwner, toEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={toEditMode}>Edit profile page</button>
        </div>
      )}
      <h2>{profile.fullName}</h2>
      <h3>page ID: {profile.userId}</h3>
      <div>
        <b>{profile.aboutMe || "About me: "}</b>
      </div>
      {/* <div>Looking for a job?
        <span><b>{profile.lookingForAJob ? "yes" : "no"}</b></span>
        <b>{profile.lookingForAJobDescription}</b>
      </div>
      <div>Professional skills:
        <span><b>{profile.lookingForAJobDescription}</b></span>
      </div> */}
      <div>
        <b>Contacts:</b>
        <div className={s.descriptionBlock}>{Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
